import { Component } from "react";
/**
 * ?
 */
export default class WhenMounted extends Component {
    state = {
        mounted: false
    };
    async componentDidMount() {
        this.setState({
            mounted: true
        });
    }
    render() {
        return this.state.mounted && this.props.children;
    }
}
