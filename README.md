# Press to win

Moninpeli, jossa pelaajat painavat nappia. Aluksi pelaajalla on 20 pistettä ja joka painalluksesta menettää pisteen.

Kaikki pelaajat kasvattavat saman laskurin arvoa. Laskurin saldosta voi voittaa pisteitä seuraavasti:


Pelaaja voittaa


- 5 pistettä joka 10. painallus
- 40 pistettä joka 100. painallus
- 250 pistettä joka 500. painallus.


Pelin viimeisin versio löytyy osoitteesta [https://press-to-win.herokuapp.com/](https://press-to-win.herokuapp.com/)



Sovellus on tehty stackille React, Node.js, MongoDB. Se ei edellytä rekisteröitymistä ja kirjautumista, mutta pelin ajaksi asetetaan käyttäjänimi. Käyttäjänimelle tallennetaan pistesaldo. Pelaajan ollessa online, eivät muut pelaajat voi käyttää samaa käyttäjänimeä. Jos pelaaja poistuu kokonaan pelistä (exit), voi joku muu käyttää samaa käyttäjänimeä ja jatkaa jollekin käyttäjänimelle luodusta pistesaldosta, joka on talletettu tietokantaan. Jos käyttäjä ei poistu pelistä (exit), muistaa selain käyttäjän ja pelitilanne säilyy, vaikka selain suljetaan ja avataan uudelleen. Jos pelaajan pistesaldo menee nollaan, on peli mahdollista aloittaa alusta 20 pisteellä.  




