import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const trunfoMsg = 'Você já tem um Super Trunfo em seu baralho';
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="name-input">
            Nome
            <input
              data-testid="name-input"
              type="text"
              id="name"
              value={ cardName }
              onChange={ onInputChange }
              name="cardName"
            />
          </label>
          <label htmlFor="description-input">
            Descrição
            <input
              data-testid="description-input"
              type="textarea"
              id="description"
              value={ cardDescription }
              onChange={ onInputChange }
              name="cardDescription"
            />
          </label>
          <label htmlFor="attr1-input">
            Attr01
            <input
              data-testid="attr1-input"
              type="number"
              id="attr1"
              value={ cardAttr1 }
              onChange={ onInputChange }
              name="cardAttr1"
            />
          </label>
          <label htmlFor="attr2-input">
            Attr02
            <input
              data-testid="attr2-input"
              type="number"
              id="attr2"
              value={ cardAttr2 }
              onChange={ onInputChange }
              name="cardAttr2"
            />
          </label>
          <label htmlFor="attr3-input">
            Attr03
            <input
              data-testid="attr3-input"
              type="number"
              id="attr3"
              value={ cardAttr3 }
              onChange={ onInputChange }
              name="cardAttr3"
            />
          </label>
          <label htmlFor="image-input">
            Imagem
            <input
              data-testid="image-input"
              type="text"
              id="imagem"
              value={ cardImage }
              onChange={ onInputChange }
              name="cardImage"
            />
          </label>
          <label htmlFor="rare-input">
            <select
              id="rare"
              data-testid="rare-input"
              value={ cardRare }
              onChange={ onInputChange }
              name="cardRare"
            >
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
          </label>
          <label htmlFor="trunfo-input">
            Super Trunfo?
            {
              hasTrunfo ? <p>{trunfoMsg}</p> : <input
                type="checkbox"
                data-testid="trunfo-input"
                id="trunfo"
                checked={ cardTrunfo }
                onChange={ onInputChange }
                name="cardTrunfo"
              />
            }
          </label>
          <button
            type="button"
            data-testid="save-button"
            id="button"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
          >
            Salvar
          </button>
        </form>
      </div>

    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
