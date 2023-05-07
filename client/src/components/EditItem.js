import React, { Component } from 'react';

class EditItem extends Component {

    constructor(props) {
        super(props);

        this.item = props.item;
        this.section = props.section;
        this.active = props.active;

        this.closeEdit = this.closeEdit.bind(this);
        this.changeItem = this.changeItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    changeItem(item, type, e, section) {
        let value = e.target.value;
        if (type === 'price') {
            value = value === "" ? 0 : value[value.length-1] === "." ? value : value.substring(value.length-2) === ".0" ? value : isNaN(value) ? 0 : parseFloat(value);
        }
        item[type] = value;
        this.props.changeItem(item, section.key);
    }

    closeEdit() {
        this.props.editItem(null, null);
    }

    deleteItem(section, item) {
        this.props.deleteItem(section, item);
    }

    render() {
        const {active, section, item} = this.props;

        if (section === null || item === null) return (<div className='EditItem'></div>);
        return (

            <div className={`EditItem ${active}`}>

                <div className='editDeleteItem' onClick={() => {this.deleteItem(section, item)}}>
                    Delete Item
                </div>

                <div className='editTitle'>
                    Edit {section.title}
                </div>

                <div className='editInputs'>
                    <input placeholder='Item name' value={item.name} onInput={(e) => {this.changeItem(item, "name", e, section)}} />
                    <input placeholder='Price' value={item.price === null ? 0 : item.price} onInput={(e) => {this.changeItem(item, "price", e, section)}} />
                </div>

                <div className='dateAndDone'>
                    <div>
                        {/* {new Date(this.item.date).toLocaleString()} */}
                    </div>
                    <div className='editDone' onClick={this.closeEdit}>
                        Done
                    </div>
                </div>
                
            </div>
        )
    }
}

export default EditItem;