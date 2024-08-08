import { renderToString } from 'react-dom/server'

import App from '../client/App'

const renderer = async (ctx) => {
  // 渲染
  const htmlMarkup = renderToString(<App />)

  // 插入并返回 HTML
  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="root">${htmlMarkup}</div>
        <script src="/main.js"></script>
      </body>
    </html>
  `
}

export default renderer
