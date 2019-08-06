import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Label, Input} from 'reactstrap';

import {
    changeField
} from '../../redux/actions/topicActions';

const listCategory = [
    {name: "Miền Bắc"},
    {name: "Miền Nam"},
    {name: "Miền Trung"},
    {name: "Hàn Quốc"},
    {name: "Nhật Bản"},
    {name: "Thái Lan"},
    {name: "Trung Quốc"}
];

class Category extends Component {
    constructor(props) {
        super(props);
        this.changeField = this.changeField.bind(this);
    }

    changeField(e) {
        this.props.dispatch(changeField({[e.target.name] : e.target.value}))
    }

    render() {
        return (
            <>
            <Label htmlFor="category">Category</Label>
            <Input type="select" name="category" value={this.props.topic.category} id="category" onChange={this.changeField}>
                {
                    listCategory.map((item, key) => (
                        <option 
                        key={key}
                        value={item.name}
                        >{item.name}</option>
                    ))
                }
            </Input>
            </>
        )
    }
}

const mapStatetoProps = state => ({
    topic: state.topic
});

export default connect(mapStatetoProps)(Category);