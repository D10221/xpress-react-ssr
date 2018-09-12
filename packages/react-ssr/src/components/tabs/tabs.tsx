import React, { Component } from "react";
import styles from "./styles";
/** */
export default class Tabs extends Component<{ labels: any[] }> {

    state = {
        tabIndex: 0
    }

    handleSetTabIndex = (tabIndex: number): React.EventHandler<any> => {
        return (e) => {
            this.setTabIndex(tabIndex);
        }
    }
    setTabIndex = (tabIndex: number) => {
        this.setState({
            tabIndex
        })
    }

    render() {
        const { tabIndex } = this.state;
        return (<>
            <style children={styles} />
            <div className="root">
                <ul className="menu">
                    {this.props.labels.map((label, i) =>
                        <li key={`tab_label_${i}`}
                            className="menu-item"
                            onClick={this.handleSetTabIndex(i)}>{label}</li>
                    )}
                </ul>
                <div className="content">
                    {React.Children.toArray(this.props.children).find((_, i) => i === tabIndex)}
                </div>
            </div>
        </>);
    }
}
