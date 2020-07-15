import React, { Component } from 'react'

class Test extends Component {
    constructor(props) {
        super(props)
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.content !== this.props.content) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        console.log('child-render')
        return (
            <li>
                {
                    this.props.flag === 'edit' ?
                        <span>{this.props.content}</span> :
                        <input className="edit"
                            onChange={this.props.inputChange.bind(this)}
                        />
                }
                <button className="change" onClick={this.handleClick.bind(this)}>{this.props.flag}</button>
                <button className="delete" onClick={this.deleteClick.bind(this)}>delete</button>
            </li>
        )
    }
    deleteClick() {
        //console.log('聊')
        this.props.deleteItem(this.props.index)
    }
    handleClick() {
        this.props.changeItem(this.props.flag, this.props.index)
    }

}

export default Test;