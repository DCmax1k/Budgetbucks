import React, { Component } from 'react';

class Item extends Component {

    constructor(props) {
        super(props);

        this.state= {
            dateActive: false,
            active: false,
            deleting: false,
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.changeItem = this.changeItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    open() {
        this.setState({
            active: true,
        });
    }
    close() {
        this.setState({
            active: false,
        });
    }

    changeItem(item, type, e, section) {
        let value = e.target.value;
        item[type] = value;
        this.props.changeItem(item, section.key);
    }

    deleteItem(section, item) {
        this.setState({
            deleting: true,
        });

        // Wait for animation to delete
        setTimeout(() => {
            this.props.deleteItem(section, item);
        }, 305);
        
    }

    render() {

        const { item, section } = this.props;

        return (
            <div className={`Item ${this.state.dateActive ? "date" : ""} ${this.state.active ? 'focused' : ''} ${this.state.deleting ? 'deleting' : ''}`} /*style={{backgroundColor: section.color}}*/>
                {/* <div className={`itemDate ${this.state.dateActive ? "date" : ""}`}>
                    {new Date(this.item.date).toLocaleDateString()}
                </div> */}
                <div className='row1 row' onClick={() => this.open()}>
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
                    <div className='doneBtn' onClick={() => this.close()} style={{background: `linear-gradient(rgba(0,0,0,0.40), rgba(0,0,0,0.40)), linear-gradient(${section.color}, ${section.color})`}}>
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