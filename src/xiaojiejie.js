import React, { Component, Fragment } from 'react'
import axios from 'axios'
import './style.css'
import Test from './test'

class Xiaojiejie extends Component {
    // 在某一时刻，可以自动执行的函数
    constructor(props) {
        super(props)
        this.state = {

            inputValue: '',
            list: []
        }
    }

    //axios获取外部数据
    componentDidMount() {
        axios.get('https://www.easy-mock.com/mock/5f0e30504f989222f243a174/ReactDemo01/xiaojiejie')
            .then((res) => {
                console.log('axios 获取数据成功' + JSON.stringify(res))
                this.setState({
                    list: res.data.data
                })
            })
            .catch((error) => {
                console.log('axios 获取数据失败' + error)
            })
    }

    // 组件第一次存在于dom中，函数是不会被执行
    // 如果已经存在Dom中，函数才会被执行
    render() {
        return (
            /*navigation */
            <Fragment>
                <div>
                    <label htmlFor='jsj'>增加服务：</label>
                    <input
                        id='jsj'
                        className='input'
                        value={this.state.inputValue}
                        onChange={this.inputChange.bind(this)}
                        ref={(input) => { this.input = input }}
                    />
                    <button onClick={this.addList.bind(this)}>增加服务</button>
                </div>
                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <Test
                                    flag={item.flag}
                                    key={index + item.flag + item.content}
                                    content={item.content}
                                    index={index}
                                    list={this.state.list}
                                    inputChange={this.inputChange.bind(this)}
                                    deleteItem={this.deleteItem.bind(this)}
                                    changeItem={this.changeItem.bind(this)}
                                />)

                        })

                    }
                </ul>
            </Fragment>
        )
    }
    inputChange(e) {
        //console.log(e.target.value)
        // this.state.inputValue= e.target.value
        this.setState({
            inputValue: e.target.value
        })
    }

    //增加list
    addList() {
        const List = {
            flag: 'edit',
            content: this.state.inputValue
        }
        this.setState({
            list: [...this.state.list, List]
        })

    }
    //删除List里的项目
    deleteItem(index) {
        //console.log(index);
        let list = this.state.list
        list.splice(index, 1)
        this.setState({
            list: list
        })

    }
    //修改List里的项目
    changeItem(flag, index) {
        const List = [...this.state.list]
        /*list.map((item, i) => {
                    if (i === index) {
                        item.flag = item.flag === 'edit' ? 'save' : 'edit'
                    }
                    return item
        }*/
        List.map((item, i) => {
            if (i === index) {
                if (flag === 'edit') {
                    //当flag是edit时 点击按钮edit名字改成save
                    item.flag = 'save'
                    this.setState(
                        {
                            list: List
                        }
                    )

                } else if (flag === 'save') {
                    //当flag是save时 点击按钮save名字改成save且替换List[index]的content值
                    List.splice(index, 1, {
                        flag: 'edit',
                        content: this.state.inputValue
                    })
                    this.setState(
                        {
                            list: List
                        }
                    )
                }
            }
        })

    }
}
export default Xiaojiejie

// npm install xxx
// npm install -g xxx
// npm install -save xxx
// npm install -save-dev axios dev