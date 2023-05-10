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
    }

    editItem(state) {
        if (state === false) this.props.editItem(null, null);
        this.props.editItem(this.section, this.item);
    }

    render() {
        const animateItem = this.props.animateItem; // boolean for animation
        const currentItem = this.props.currentItem; // boolean for focused item
        return (
            <div className={`Item ${this.state.dateActive ? "date" : ""} ${animateItem ? "leave" : ""} ${currentItem ? "focused" : ""}`} onClick={this.editItem}>
                {/* <div className={`itemDate ${this.state.dateActive ? "date" : ""}`}>
                    {new Date(this.item.date).toLocaleDateString()}
                </div> */}
                <div className='itemName' title={this.item.name}>
                    {this.item.name.length > 20 ? this.item.name.substring(0, 20) + "..." : this.item.name}
                </div>
                <div className='itemPrice'>
                   {this.item.price} 
                </div>
                
            </div>
        )
    }
}

export default Item;