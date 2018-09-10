Usage:
    
    const { default:useWebpack } = (await import("@local/dev-middleware";
    useWebpack(
        app, 
        join(__dirname, "..", "webpack.config"), 
        {
            devMiddlewareOptions: {
            // ...
            }
        }
    );