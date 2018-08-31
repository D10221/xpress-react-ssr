declare interface NodeModule extends NodeJS.Module {
    hot: {
        accept(...args: any[]): any;
    }
}