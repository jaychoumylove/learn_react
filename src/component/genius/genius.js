import React from 'react';
import {connect} from 'react-redux';
import {getUserList} from "../../redux/chatuser";
import UserCard from '../usercard/usercard';


@connect(
    state => state.chatUser,
    {getUserList}
)
class Genius extends React.Component {
    componentDidMount() {
        if (this.props.userlist.length <= 0) this.props.getUserList('boss');
    }

    render() {
        return <UserCard userlist={this.props.userlist}/>
    }
}

export default Genius