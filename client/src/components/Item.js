import React, { Component } from 'react';

class Item extends Component {

    constructor(props) {
        super(props);

        this.budget = props.budget;
        this.item = props.item;
        this.state= {
            dateActive: false,
        };
    }

    render() {
        return (
            <div className={`Item ${this.state.dateActive ? "date" : ""}`}>
                {/* <div className={`itemDate ${this.state.dateActive ? "date" : ""}`}>
                    {new Date(this.item.date).toLocaleDateString()}
                </div> */}
                <div className='itemName' title={this.item.name}>
                    {this.item.name.length > 16 ? this.item.name.substring(0, 15) + "..." : this.item.name}
                </div>
                <div className='itemPrice'>
                   {this.item.price} 
                </div>
                
            </div>
        )
    }
}

export default Item;