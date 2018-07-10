import React from 'react';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import AvatarSelector from '../component/avatarselector/avatar-selector';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {update} from '../redux/user.redux';
import Form from '../component/form/form';

@connect(
    state => state.user,
    {update}
)

@Form
class GeniusInfo extends React.Component {
    constructor(props) {
        super(props);
        this.selectAvatar = this.selectAvatar.bind(this);
    }

    selectAvatar(e) {
        this.props._handleChange('avatar',e)
    }

    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}/> : null}
                <NavBar
                    mode="dark"
                    // icon={<Icon type="left"/>}
                    // onLeftClick={() => console.log('onLeftClick')}
                >牛人完善信息</NavBar>
                <AvatarSelector
                    selectAvatar={this.selectAvatar}
                />
                <InputItem
                    onChange={(v) => this.props._handleChange('title', v)}
                >求职岗位</InputItem>
                <TextareaItem
                    title='个人简介'
                    onChange={(v) => this.props._handleChange('desc', v)}
                    placeholder='可换行'
                    autoHeight={true}
                />
                <Button
                    onClick={() => {
                        this.props.update(this.props.state)
                    }}
                    type='primary'
                >保存信息</Button>
            </div>
        )
    }
}

export default GeniusInfo;