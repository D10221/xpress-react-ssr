declare interface NodeModule extends NodeJS.Module {
    hot: {
        accept(): any;
    }
}