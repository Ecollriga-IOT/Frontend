export default class Card {
  constructor(
    id,
    cardNumber,
    cardType,
    cardCvv,
    cardExpirationDate,
    cardAmount,
    cardHolder,
    cardMain,
    userId
  ) {
    this.id = id; // ID único de la tarjeta
    this.cardNumber = cardNumber; // Número de la tarjeta
    this.cardType = cardType; // Tipo de tarjeta (e.g., Crédito/Débito)
    this.cardCvv = cardCvv; // Código CVV
    this.cardExpirationDate = cardExpirationDate; // Fecha de vencimiento
    this.cardAmount = cardAmount; // Monto asociado a la tarjeta
    this.cardHolder = cardHolder; // Nombre del titular de la tarjeta
    this.cardMain = cardMain; // Indicador de si es tarjeta principal
    this.userId = userId; // ID del usuario asociado
  }

  static fromJson(json) {
    return new Card(
      json.id || json.cardId,
      json.cardNumber,
      json.cardType,
      json.cardCvv,
      json.cardExpirationDate,
      json.cardAmount,
      json.cardHolder,
      json.cardMain,
      json.userId
    );
  }

  toJson() {
    return {
      id: this.id,
      cardNumber: this.cardNumber,
      cardType: this.cardType,
      cardCvv: this.cardCvv,
      cardExpirationDate: this.cardExpirationDate,
      cardAmount: this.cardAmount,
      cardHolder: this.cardHolder,
      cardMain: this.cardMain,
      userId: this.userId,
    };
  }
}