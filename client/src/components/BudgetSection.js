import React, { Component } from 'react';
import Item from './Item';

class BudgetSection extends Component {

    constructor(props) {
        super(props);

        const { section, budget } = props;
        this.section = section;
        this.budget = budget;

        this.calculateSpent = this.calculateSpent.bind(this);
        this.changePercent = this.changePercent.bind(this);
        this.editItem = this.editItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.changeName = this.changeName.bind(this);
    }

    calculateSpent(section) {
        let spent = 0;
        section.items.forEach(item => {
            spent += item.price;
        });
        return spent;
    }

    changePercent(e) {
        const { budget, section } = this.props;
        const newBudget = {...budget};
        newBudget.sections[section.key].percent = e.target.value;
        this.props.modifyBudget(newBudget);
    }

    changeName(e) {
        const { budget, section } = this.props;
        const newBudget = {...budget};
        newBudget.sections[section.key].title = e.target.value;
        this.props.modifyBudget(newBudget);
    }

    addItem(section) {
        this.props.addItem(section);
    }

    calculatePercent(sec, bud) {
        const value = bud.budgetAmount*(sec.percent/100);
        if (isNaN(value)) return "rly? a letter?";
        return parseFloat(value.toFixed(2));
    }

    editItem(section, item) {
        this.props.editItem(section, item);
    }

    render() {
        const { section, budget } = this.props;
        const spent = this.calculateSpent(section, budget);

        const spentText = isNaN(spent) ? 0 : typeof(spent) !== 'string' ? spent.toFixed(2) : spent.substring(spent.length - 1) === "." ? spent : spent.substring(spent.length - 2) === ".0" ? spent : spent.toFixed(2);
        const totalText = this.calculatePercent(section, budget);
        let red = false;
        if (spentText>totalText) red = true;
        if (spentText<totalText) red = false;

        const animateItem = this.props.animateItem; // id of item to animate remove
        const currentItem = this.props.currentItem;

        return (
            <div className="BudgetSection" key={section.key}>
                <div className='percentCont'>
                    <input type='text' className='percent' value={section.percent} onInput={this.changePercent} />
                    &nbsp;%
                </div>
                
                <div className='sectionTitle' >
                    <input type="text" value={section.title} onInput={this.changeName} />
                </div>

                <div className='fraction' >
                    <span className={`spent ${red}`}>{spentText}</span>
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                    <span className='total'>{totalText}</span>
                </div>

                {/* Items */}
                <div className='Items'>
                    {section.items.map((item, k) => {
                    return(
                        <Item key={item.date} budget={budget} section={section} item={item} editItem={this.editItem} animateItem={animateItem === k ? true : false} currentItem={currentItem === null ? false : currentItem.id === item.id} />
                    )
                })}
                </div>

                {/* Add item */}
                <div className='addItem' onClick={() => {this.addItem(section)}}>
                    <img src="/images/plus.svg" alt='add item' />
                </div>

                <div className='rightBorder'></div>
                
                
            </div>
        )
    }
}

export default BudgetSection;