const express = require('express');
const app = express();
const port = process.env.APP_PORT || 3000;

let deploymentCount = 0;
let lastDeployTime = new Date().toLocaleString();

app.use(express.json());

app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>CI/CD Demo App</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
            .container { max-width: 800px; margin: 0 auto; background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; }
            .deploy-info { background: rgba(255,255,255,0.2); padding: 20px; border-radius: 10px; margin: 20px 0; }
            .success { color: #ff00f2ff; font-weight: bold; }
            .version { font-size: 24px; margin-bottom: 10px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 CI/CD Demo Application</h1>
            <div class="deploy-info">
                <div class="version">Версия: 1.0.${deploymentCount}</div>
                <div>Количество деплоев: <span class="success">${deploymentCount}</span></div>
                <div>Последний деплой: <span class="success">${lastDeployTime}</span></div>
                <div>GitHub Actions: <span class="success">✅ Активен</span></div>
            </div>
            <div class="deploy-info">
                <h3>Как это работает:</h3>
                <ol>
                    <li>Я меняю код и делаю git push</li>
                    <li>GitHub Actions автоматически:
                        <ul>
                            <li>✅ Собирает Docker образ</li>
                            <li>✅ Запускает тесты</li>
                            <li>✅ Разворачивает новую версию</li>
                            <li>✅ Обновляет счетчик деплоев</li>
                        </ul>
                    </li>
                    <li>Вы видите результат здесь!</li>
                </ol>
            </div>
            <div class="deploy-info">
                <h3>Статус системы:</h3>
                <div>🟢 Приложение работает</div>
                <div>🟢 База данных: Подключенаaaaaaaaaaa</div>
                <div>🟢 CI/CD: Активен</div>
                <div>📊 Следующий деплой: #${deploymentCount + 1}</div>
            </div>
        </div>
    </body>
    </html>
  `;
  res.send(html);
});

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    deploymentCount: deploymentCount,
    lastDeploy: lastDeployTime
  });
});

app.post('/deploy', (req, res) => {
  deploymentCount++;
  lastDeployTime = new Date().toLocaleString();
  res.json({ 
    success: true, 
    newCount: deploymentCount,
    timestamp: lastDeployTime
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    version: `1.0.${deploymentCount}`,
    totalDeploys: deploymentCount,
    lastDeploy: lastDeployTime,
    status: 'running'
  });
});

app.listen(port, () => {
  console.log(`🚀 App v1.0.${deploymentCount} running on port ${port}`);
  console.log(`📊 Total deploys: ${deploymentCount}`);
});