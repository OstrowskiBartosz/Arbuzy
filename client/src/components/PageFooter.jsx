import React from "react";

class PageFooter extends React.Component {
  // constructor(props){
  //   super(props);
  // }
  render() {
    return (
      <footer>
        <div className="footer-element">
          <b className="footer-element-header">Sklep komputerowy Arbuzy.com</b>
          <br />
          <span className="footer-element-text">
            Morele.net to jeden z największych i najpopularniejszych sklepów
            komputerowych w Polsce. W szerokiej ofercie sklepu można znaleźć
            wysokiej klasy laptopy, komputery na każdą kieszeń, wydajne
            podzespoły komputerowe oraz urządzenia peryferyjne. Szeroka oferta
            urządzeń, akcesoriów i podzespołów umożliwia skonfigurowanie i zakup
            komputerów o optymalnej wydajności i atrakcyjnej cenie. W
            asortymencie sklepu nie brak również sprzętów dla graczy – to
            ergonomiczne i precyzyjne myszki i klawiatury, wysokiej klasy
            słuchawki, wydajne karty graficzne, nowoczesne procesory i
            komfortowe fotele gamingowe. Szeroka oferta produktów i ich bardzo
            duża dostępność to kwestie, które sprawiają, że zakupy są szybkie i
            wygodne, a na zamówione sprzęty i akcesoria komputerowe nie trzeba
            długo czekać.{" "}
          </span>
        </div>
        <div className="footer-element">
          <b className="footer-element-header">Najlepszy sprzęt komputerowy</b>
          <br />
          <span className="footer-element-text">
            Sklep komputerowy Arbuzy.com oferuje największy w Polsce podzespołów
            komputerowych. Tak zróżnicowana oferta produktów z wielu kategorii
            stwarza możliwość wyszukania i dopasowania sprzętów do oczekiwań
            nabywców, a unikatowe promocje są szansą na jeszcze tańsze zakupy.{" "}
          </span>
        </div>
        <div className="footer-element">
          <b className="footer-element-header">
            Niskie ceny, wysoka jakość obsługi, szybka dostawa{" "}
          </b>
          <br />
          <span className="footer-element-text">
            Dopasowanie oferty do potrzeb i oczekiwań kupujących to tylko jeden
            z wielu atutów sklepu Arbuzy.net. Asortyment sklepu jest bardzo
            mocno zróżnicowany pod względem cen, dlatego każdy znajdzie w nim
            coś dla siebie. Niskie ceny idą w parze z wysoką jakością obsługi
            oraz z szybką realizacją zamówień. Zakupione produkty są dostarczane
            różnymi metodami wysyłkowymi.{" "}
          </span>
        </div>
        <div className="footer-element-copyright">
          <span className="footer-element-copyright-text">
            Copyright © 2019 Arbuzy.com
          </span>
        </div>
      </footer>
    );
  }
}

export default PageFooter;
