<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Design Review</title>
<style>body{font-family:system-ui;max-width:800px;margin:auto;padding:2em}
.score{font-size:3em;font-weight:700;text-align:center;padding:.3em}
.detail{background:#f9fafb;padding:1em;border-radius:8px;margin:.5em 0}
table{width:100%;border-collapse:collapse}
td,th{padding:8px;text-align:left;border-bottom:1px solid #e5e7eb}
</style></head>
<body>
<h1>Design Review</h1>
<p>Generated: {{DATE}} | Scope: {{TARGET}}</p>
<div class="score" style="color:{{SCORE_COLOR}}">{{SCORE}}/100</div>
<div class="detail"><strong>Gut reaction:</strong> {{GUT}}</div>
<table>
<tr><th>Section</th><th>Score</th><th>Findings</th></tr>
{{SECTIONS}}
</table>
</body></html>
