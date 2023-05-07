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

    addItem(section) {
        this.props.addItem(section);
    }

    calculatePercent(sec, bud) {
        const value = bud.budgetAmount*(sec.percent/100);
        if (isNaN(value)) return "rly? a letter?";
        return value.toFixed(2);
    }

    editItem(section, item) {
        this.props.editItem(section, item);
    }

    render() {
        const { section, budget } = this.props;
        const spent = this.calculateSpent(section, budget);

        return (
            <div className="BudgetSection" key={section.key}>
                <div className='percentCont'>
                    <input type='text' className='percent' value={section.percent} onInput={this.changePercent} />
                    &nbsp;%
                </div>
                
                <div className='sectionTitle' >
                    {section.title}
                </div>

                <div className='fraction' >
                    <span className='spent'>{isNaN(spent) ? 0 : spent/*.toFixed(2)*/}</span>
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                    <span className='total'>{(this.calculatePercent(section, budget))}</span>
                </div>

                {/* Items */}
                <div className='Items'>
                    {section.items.map((item, k) => {
                    return(
                        <Item key={item.name} budget={budget} section={section} item={item} editItem={this.editItem} />
                    )
                })}
                </div>

                {/* Add item */}
                <div className='addItem' onClick={() => {this.addItem(section)}}>
                    <img src="/images/plus.svg" alt='add item' />
                </div>
                
                
            </div>
        )
    }
}

export default BudgetSection;