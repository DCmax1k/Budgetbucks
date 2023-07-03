import React, { Component } from 'react';

class Item extends Component {

    constructor(props) {
        super(props);

        this.budget = props.budget;
        this.item = props.item;
        this.section = props.section;
        this.state= {
            dateActive: false,
        };

        this.editItem = this.editItem.bind(this);
        this.changeItem = this.changeItem.bind(this);
        this.closeEdit = this.closeEdit.bind(this); 
        this.deleteItem = this.deleteItem.bind(this);
    }

    editItem(state) {
        if (state === false) this.props.editItem(null, null);
        this.props.editItem(this.section, this.item);
    }

    changeItem(item, type, e, section) {
        let value = e.target.value;
        item[type] = value;
        this.props.changeItem(item, section.key);
    }

    closeEdit() {
        this.props.editItem(null, null);
    }

    deleteItem(section, item) {
        this.closeEdit();
        setTimeout(() => {
            this.props.deleteItem(section, item);
        }, 301);
        
    }

    render() {
        const animateItem = this.props.animateItem; // boolean for animation
        const currentItem = this.props.currentItem; // boolean for focused item

        const { item, section } = this.props;

        return (
            <div className={`Item ${this.state.dateActive ? "date" : ""} ${animateItem ? "leave" : ""} ${currentItem ? "focused" : ""}`} onClick={this.editItem} /*style={{backgroundColor: section.color}}*/>
                {/* <div className={`itemDate ${this.state.dateActive ? "date" : ""}`}>
                    {new Date(this.item.date).toLocaleDateString()}
                </div> */}
                <div className='row1 row'>
                    <div className='itemName' title={item.name}>
                        {item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name}
                    </div>
                    <div className='itemPrice'>
                        {item.price > 0 ? '$' : ''}{item.price} 
                    </div>
                </div>
                <div className='row2 row'>
                    <input type='text' placeholder='Label' value={item.name} onInput={(e) => {this.changeItem(item, "name", e, section)}} />
                </div>
                <div className='row3 row'>
                    <input type='number' placeholder='Amount' value={item.price === null ? "" : item.price} onInput={(e) => {this.changeItem(item, "price", e, section)}} />
                    <div className='doneBtn' onClick={this.closeEdit} style={{backgroundColor: section.color}}>
                        Done
                    </div>
                </div>
                
                <div className='deleteItem' onClick={() => {this.deleteItem(section, item)}}>
                    Delete
                </div>
                
            </div>
        )
    }
}

export default Item;