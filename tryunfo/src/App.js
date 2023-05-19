import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: '',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    savedCard: [],
    nameFilter: '',
    rareFilter: '',
  }

  disableButton = () => {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardImage } = this.state;

    const attr1 = parseInt(cardAttr1, 10);
    const attr2 = parseInt(cardAttr2, 10);
    const attr3 = parseInt(cardAttr3, 10);
    const somaAttr = 210;
    const valorAttr = 90;

    if (cardName.length > 0
      && cardDescription.length > 0
      && cardImage.length > 0
      && cardRare.length > 0
      && (attr1 + attr2 + attr3 <= somaAttr)
      && (attr1 >= 0 && attr1 <= valorAttr)
      && (attr2 >= 0 && attr2 <= valorAttr)
      && (attr3 >= 0 && attr3 <= valorAttr)) {
      return this.setState({ isSaveButtonDisabled: false });
    }

    return this.setState({ isSaveButtonDisabled: true });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value },
      this.disableButton);
    // console.log(value);
  }

  trunfoCheck = () => {
    const { savedCard } = this.state;
    if (savedCard.some((element) => element.trunfo === true)) {
      return this.setState({ hasTrunfo: true });
    } return this.setState({ hasTrunfo: false });
  }

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo } = this.state;
    const { savedCard } = this.state;
    const arrayCards = [...savedCard];
    arrayCards.push(
      {
        name: cardName,
        description: cardDescription,
        attr1: cardAttr1,
        attr2: cardAttr2,
        attr3: cardAttr3,
        image: cardImage,
        rare: cardRare,
        trunfo: cardTrunfo,
      },
    );
    this.setState({ savedCard: arrayCards });
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
    }, this.trunfoCheck);
  }

  // deleteCard = ({ target }) => {
  //   const { savedCard } = this.state;
  //   savedCard.splice(target, 1);
  //   this.setState(savedCard);
  //   if (savedCard.trunfo === true) {
  //     this.setState({ cardTrunfo: false });
  //   }
  // }

  cardDelete = ({ target }) => {
    const cardName = target.name;
    const superTrunfo = target.value;
    const { savedCard } = this.state;
    const cleanArray = savedCard.filter((card) => card.name !== cardName);
    if (superTrunfo === false) {
      this.setState({ savedCard: cleanArray });
    } else {
      this.setState({ savedCard: cleanArray });
      this.setState({ cardTrunfo: false }, this.trunfoCheck);
    }
  }

  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      hasTrunfo,
      savedCard,
      nameFilter,
      rareFilter,
    } = this.state;

    return (
      <main>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.handleChange }
          onSaveButtonClick={ this.onSaveButtonClick }
          hasTrunfo={ hasTrunfo }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <section>
          <p>Filtro de buscas</p>
          <input
            type="text"
            value={ nameFilter }
            name="nameFilter"
            placeholder="Nome da carta"
            onChange={ this.handleChange }
            data-testid="name-filter"
          />
          <select
            value={ rareFilter }
            name="rareFilter"
            placeholder="Raridade"
            onChange={ this.handleChange }
            data-testid="rare-filter"
          >
            <option>todas</option>
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
        </section>
        <section>
          {savedCard.filter((card) => (card.name.includes(nameFilter)
          && (rareFilter !== 'raro'
          && rareFilter !== 'normal'
          && rareFilter !== 'muito raro') ? card : card.rare === (rareFilter)
          ))
            .map((card) => (
              <div key={ card.name }>
                <Card
                  cardName={ card.name }
                  cardDescription={ card.description }
                  cardAttr1={ card.attr1 }
                  cardAttr2={ card.attr2 }
                  cardAttr3={ card.attr3 }
                  cardImage={ card.image }
                  cardRare={ card.rare }
                  cardTrunfo={ card.trunfo }
                  key={ card.description }
                />
                <button
                  name={ card.name }
                  value={ card.trunfo }
                  type="button"
                  data-testid="delete-button"
                  onClick={ this.cardDelete }
                >
                  Excluir
                </button>
              </div>
            ))}
        </section>

      </main>

    );
  }
}

export default App;
