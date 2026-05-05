$ErrorActionPreference = 'Stop'
$port = 5500
$url = "http://127.0.0.1:$port"

Write-Host "Pornesc serverul local pe $url"
Write-Host "Apasă Ctrl+C în acest terminal pentru a opri serverul."

Start-Process $url
py -m http.server $port
