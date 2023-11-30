import { MD_REGEX } from '../constants';
import { Plugin } from 'vite';
import assert from 'assert';

/**
 *  Vite 热更新的主要流程:
1. 监听文件变动。
2.构建侧确定热更新的边界模块。
3.浏览器侧执行更新逻辑。
 * @returns 
 */
export function pluginMdxHMR(): Plugin {
  let viteReactPlugin: Plugin;
  return {
    name: 'vite-plugin-mdx-hmr',
    apply: 'serve',
    configResolved(config) {
      // 先找到处理的插件
      viteReactPlugin = config.plugins.find(
        (plugin) => plugin.name === 'vite:react-babel'
      ) as Plugin;
    },
    async transform(code, id, opts) {
      // 过滤mdx文件
      if (MD_REGEX.test(id)) {
        // Inject babel refresh template code by @vitejs/plugin-react
        assert(typeof viteReactPlugin.transform === 'function');
        const result = await viteReactPlugin.transform?.call(
          this,
          code,
          id + '?.jsx',
          opts
        );
        // 插入import.meta.hot.accept的调用语句
        const selfAcceptCode = 'import.meta.hot.accept();';

        if (
          typeof result === 'object' &&
          !result.code?.includes(selfAcceptCode)
        ) {
          result.code += selfAcceptCode;
        }
        return result;
      }
    },
    handleHotUpdate(ctx) {
      if (/\.mdx?/.test(ctx.file)) {
        ctx.server.ws.send({
          type: 'custom',
          event: 'mdx-changed',
          data: {
            filePath: ctx.file
          }
        });
      }
    }
  };
}
