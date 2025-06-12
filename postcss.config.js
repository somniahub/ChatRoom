export default {
    plugins: {
        '@tailwindcss/postcss': {},
        autoprefixer: {},
        'postcss-px-to-viewport': {
            viewportWidth: 375, // 设计稿的视口宽度
            viewportHeight: 667, // 设计稿的视口高度
            unitPrecision: 5, // 单位转换后保留的精度
            viewportUnit: 'vw', // 希望使用的视口单位
            selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视口单位的类名
            minPixelValue: 1, // 小于或等于`1px`不转换为视口单位
            mediaQuery: false, // 允许在媒体查询中转换`px`
            exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件
            landscape: false, // 是否处理横屏情况
            fontViewportUnit: 'vw' // 字体使用的视口单位
        }
    }
} 