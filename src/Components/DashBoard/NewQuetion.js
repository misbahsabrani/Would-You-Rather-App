import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputField from '../ReUsableComponents/InputField';
import { Add_NEW_QUESTION, Remove_Message } from '../../Store/Actions/QuestionsActions';

class NewQuestion extends Component {
    state = {
        Option1: "",
        Option2: ""
    };
    whenChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }
    whenSubmit = () => {
        this.props.AddNewQuestion({
            optionOneText: this.state.Option1,
            optionTwoText: this.state.Option2,
            author: this.props.user.id
        });
        this.setState({
            Option1: ' ',
            Option2: " "
        })
    }
    whenEmpty = () => {
        return this.state.Option1 === "" || this.state.Option2 === ""
    }
    componentWillUnmount(){
        this.props.removeMess();
    }
    render() {
        const { Option1, Option2 } = this.state;
        const { mess, removeMess } = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col l8 m8 s12 offset-l2 offset-m2">
                        <div className="card lime lighten-5">
                            <div className="card-content">
                                <div className="card-title center purple-text">
                                    <h4> Create New Question </h4>
                                </div>
                                {mess && <div className="center">
                                    <span className="center purple-text">
                                        {mess}
                                    </span>
                                    <button className="black-text crossButton" onClick={() => removeMess()}>
                                        x
                                    </button>
                                </div>}
                                <InputField
                                    n="Option1"
                                    oc={this.whenChange}
                                    id="op1" v={Option1}
                                    labelText="Type First Option Here"
                                />
                                <div className="flow-text grey-text center">
                                    OR
                                </div>
                                <InputField
                                    n="Option2"
                                    oc={this.whenChange}
                                    id="op2" v={Option2}
                                    labelText="Type Second Option Here"
                                />
                                <div className="card-action">
                                    <button className="btn purple darken-1"
                                        disabled={this.whenEmpty()}
                                        onClick={this.whenSubmit}
                                    >
                                        Submit
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapSateToProps = (state) => {
    return {
        user: state.auth.currentUser,
        mess: state.que.questionAddedMessage,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        AddNewQuestion: (obj) => dispatch(Add_NEW_QUESTION(obj)),
        removeMess: () => dispatch(Remove_Message()),
    }
}
export default connect(mapSateToProps, mapDispatchToProps)(NewQuestion);