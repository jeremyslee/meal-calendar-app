import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Loading from 'react-loading';
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o';
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right';
import { addRecipe, removeFromCalendar } from '../actions';
import { capitalize } from '../utils/helper';
import { fetchRecipes } from '../utils/api';

class App extends Component {
  state = {
    foodModalOpen: false,
    day: null,
    meal: null,
    food: null,
    loadingFood: false,
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  openFoodModal = ({ meal, day }) => {
    this.setState(() => ({
      foodModalOpen: true,
      meal,
      day,
    }));
  }

  closeFoodModal = () => {
    this.setState(() => ({
      foodModalOpen: false,
      meal: null,
      day: null,
      food: null,
    }));
  }

  searchFood = (e) => {
    if (!this.input.value) {
      return
    }

    e.preventDefault();

    this.setState(() => ({ loadingFood: true }));

    fetchRecipes(this.input.value)
      .then((food) => this.setState(() => ({
        food,
        loadingFood: false,
      })));
  }

  render() {
    console.log(this.props);
    const { foodModalOpen, loadingFood, food } = this.state;
    const { calendar, add, remove } = this.props; // add = selecting recipe
    const mealOrder = ['breakfast', 'lunch', 'dinner'];

    return (
      <div className='container'>
        <ul className='meal-types'>
          {mealOrder.map(meal => (
            <li key={meal} className='subheader'>
              {capitalize(meal)}
            </li>
          ))}
        </ul>

        <div className='calendar'>
          <div className='days'>
            {calendar.map(({ day }) => (
              <h3 key={day} className='subheader'>{capitalize(day)}</h3>
            ))}
          </div>
          <div className='icon-grid'>
            {calendar.map(({ day, meals}) => (
              <ul key={day}>
                {mealOrder.map((meal) => (
                  <li key={meal} className='meal'>
                    {meals[meal]
                      ? <div className='food-item'>
                          <img src={meals[meal].image} alt={meals[meal].label}/>
                          <button onClick={() => remove({ meal, day })}>Clear</button>
                        </div>
                      : <button onClick= {() => this.openFoodModal({ meal, day })} className='icon-btn'>
                          <CalendarIcon size={30}/>
                        </button>
                    }
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={foodModalOpen}
          onRequestClose={this.closeFoodModal}
          contentLabel='Modal'>
          <div>
            {loadingFood === true
              ? <Loading delay={200} type='spin' color='#222' className='loading' />
              : <div className='search-container'>
                  <h3 className='subheader'>
                    Find a meal for {capitalize(this.state.day)} {this.state.meal}.
                  </h3>
                  <div className='search'>
                    <input
                      className='food-input'
                      type='text'
                      placeholder='Search Foods'
                      ref={(input) => this.input = input}
                    />
                    <button
                      className='icon-btn'
                      onClick={this.searchFood}>
                      <ArrowRightIcon size={30}/>
                    </button>
                  </div>
                </div>
            }
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ calendar, food }) {
  const days = Object.keys(calendar);
  return {
    calendar: days.map(day => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal]
          ? food[calendar[day][meal]]
          : null;
        return meals;
      }, {}),
    })),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    add: (data) => dispatch(addRecipe(data)),
    remove: (data) => dispatch(removeFromCalendar(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
