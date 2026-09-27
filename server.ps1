# ADAM XAVIER FANBASE — LOCAL SYNC SERVER
# Server mini otomatis untuk menyimpan perubahan admin langsung ke hard disk

$port = 8080
$baseDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
if (-not $baseDir) { $baseDir = Get-Location }

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Yellow
    Write-Host "  AUTOBOT LOCAL SERVER RUNNING AT: http://localhost:$port/" -ForegroundColor Green
    Write-Host "  Folder Proyek : $baseDir" -ForegroundColor Cyan
    Write-Host "  Tekan CTRL + C untuk menghentikan server" -ForegroundColor Gray
    Write-Host "==========================================================" -ForegroundColor Yellow

    # Otomatis buka admin.html di browser
    Start-Process "http://localhost:$port/admin.html"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $rawUrl = $request.RawUrl.Split('?')[0]
        if ($rawUrl -eq "/") { $rawUrl = "/index.html" }

        # API ENDPOINT: Status Server
        if ($rawUrl -eq "/api/status") {
            $json = '{"status":"ok","message":"Autobot Local Server Connected"}'
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($json)
            $response.ContentType = "application/json"
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            continue
        }

        # API ENDPOINT: Read Data (GET /api/data)
        if ($rawUrl -eq "/api/data" -and $request.HttpMethod -eq "GET") {
            $dataFile = Join-Path $baseDir "assets\js\data.js"
            if (Test-Path $dataFile) {
                # Baca file data.js dan ekstrak payload jika memungkinkan
                $respJson = '{"status":"ok","message":"Local data file active"}'
            } else {
                $respJson = '{"status":"empty"}'
            }
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($respJson)
            $response.ContentType = "application/json"
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            continue
        }

        # API ENDPOINT: Direct File Save from Admin Panel (POST/PUT /api/save or /api/data)
        if (($rawUrl -eq "/api/save" -or $rawUrl -eq "/api/data") -and ($request.HttpMethod -eq "POST" -or $request.HttpMethod -eq "PUT")) {
            $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
            $body = $reader.ReadToEnd()

            try {
                $payload = ConvertFrom-Json $body
                $bioJson = ConvertTo-Json -Depth 10 $payload.bio
                $filmsJson = ConvertTo-Json -Depth 10 $payload.films
                $eventsJson = ConvertTo-Json -Depth 10 $payload.events

                $dataJsContent = @"
/**
 * DATA STORE FOR ADAM XAVIER FANBASE (AUTO-SAVED BY LOCAL SERVER)
 * Terakhir disimpan langsung ke hard disk pada: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
 */

const DEFAULT_BIO = $bioJson;

const DEFAULT_FILMS = $filmsJson;

const DEFAULT_EVENTS = $eventsJson;

// Helper Functions
const FanbaseStore = {
  getBio: function() {
    const raw = localStorage.getItem("ax_bio");
    if (!raw) {
      localStorage.setItem("ax_bio", JSON.stringify(DEFAULT_BIO));
      return DEFAULT_BIO;
    }
    return JSON.parse(raw);
  },
  saveBio: function(bio) {
    localStorage.setItem("ax_bio", JSON.stringify(bio));
  },
  getFilms: function() {
    const raw = localStorage.getItem("ax_films");
    if (!raw) {
      localStorage.setItem("ax_films", JSON.stringify(DEFAULT_FILMS));
      return DEFAULT_FILMS;
    }
    return JSON.parse(raw);
  },
  saveFilms: function(films) {
    localStorage.setItem("ax_films", JSON.stringify(films));
  },
  getEvents: function() {
    const raw = localStorage.getItem("ax_events");
    if (!raw) {
      localStorage.setItem("ax_events", JSON.stringify(DEFAULT_EVENTS));
      return DEFAULT_EVENTS;
    }
    return JSON.parse(raw);
  },
  saveEvents: function(events) {
    localStorage.setItem("ax_events", JSON.stringify(events));
  },
  resetToDefault: function() {
    localStorage.setItem("ax_bio", JSON.stringify(DEFAULT_BIO));
    localStorage.setItem("ax_films", JSON.stringify(DEFAULT_FILMS));
    localStorage.setItem("ax_events", JSON.stringify(DEFAULT_EVENTS));
  },
  initCloudSync: async function(onUpdatedCallback) {
    let cloudData = null;
    try {
      const resp = await fetch('/api/data', { method: 'GET' });
      if (resp.ok) {
        const json = await resp.json();
        if (json && (json.bio || json.films || json.events)) cloudData = json;
      }
    } catch (e) {}

    if (!cloudData) {
      try {
        const rawCfg = localStorage.getItem('ax_cloud_config');
        if (rawCfg) {
          const cfg = JSON.parse(rawCfg);
          if (cfg.binId) {
            const headers = {};
            if (cfg.apiKey) headers['X-Master-Key'] = cfg.apiKey;
            const resp = await fetch('https://api.jsonbin.io/v3/b/' + cfg.binId + '/latest', { headers });
            if (resp.ok) {
              const resJson = await resp.json();
              if (resJson && resJson.record) cloudData = resJson.record;
            }
          }
        }
      } catch (e) {}
    }

    if (cloudData) {
      let updated = false;
      if (cloudData.bio) { localStorage.setItem("ax_bio", JSON.stringify(cloudData.bio)); updated = true; }
      if (cloudData.films && Array.isArray(cloudData.films)) { localStorage.setItem("ax_films", JSON.stringify(cloudData.films)); updated = true; }
      if (cloudData.events && Array.isArray(cloudData.events)) { localStorage.setItem("ax_events", JSON.stringify(cloudData.events)); updated = true; }
      if (updated && typeof onUpdatedCallback === 'function') onUpdatedCallback(cloudData);
      return cloudData;
    }
    return null;
  }
};
"@
                $targetFile = Join-Path $baseDir "assets\js\data.js"
                [System.IO.File]::WriteAllText($targetFile, $dataJsContent, [System.Text.Encoding]::UTF8)

                Write-Host "[OK] Perubahan data berhasil ditulis langsung ke file: $targetFile" -ForegroundColor Green

                $respJson = '{"success":true,"message":"File data.js berhasil diperbarui di harddisk!"}'
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($respJson)
            } catch {
                Write-Host "[ERROR] Gagal menyimpan file: $_" -ForegroundColor Red
                $respJson = '{"success":false,"error":"' + $_.Exception.Message + '"}'
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($respJson)
            }

            $response.ContentType = "application/json"
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            continue
        }

        # STATIC FILE SERVING
        $cleanPath = $rawUrl.TrimStart('/').Replace('/', '\')
        $filePath = Join-Path $baseDir $cleanPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".svg"  { "image/svg+xml" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".mp3"  { "audio/mpeg" }
                ".json" { "application/json" }
                default { "application/octet-stream" }
            }
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $mime
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $err = [System.Text.Encoding]::UTF8.GetBytes("404 File Not Found: $rawUrl")
            $response.OutputStream.Write($err, 0, $err.Length)
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
