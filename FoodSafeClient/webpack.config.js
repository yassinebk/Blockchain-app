const HtmlWebpackPlugin= require('html-webpack-plugin')


module.exports = {
    mode:"development",
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options:{minimize: true}
                    }
                ]
          }
      ]
    },
    
node: {
        fs:"empty",
},
plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename:"./index.html"
    })
]
};