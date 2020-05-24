import React from "react";

/** Cards component handles the display of the cards fetched.
 * Design decision: Example Card Layout was slightly changed to show
 * a 'flipping' card that contains the information fetched on the back
 * of the card. This was done because of the duplication of information
 * already on the image itself, with the other data feteched. This slightly
 * different layout closely mimicks a card's "essence". :)
 */
function Cards(props) {
  const { data } = props;
  return (
    <div id="cards" className="container--cards">
      <div className="row">
        {data.cards.map((card, index) => {
          const {
            name,
            text,
            set,
            type,
            subtypes,
            attributes,
            rarity,
            power,
            health,
            cost,
            soulSummon,
            soulTrap,
            imageUrl,
            id,
          } = card;
          return (
            <div key={id} className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img className="flip-card-image" src={imageUrl} alt={name} />
                </div>
                <div className="flip-card-back">
                  <div className="flip-card-info">
                    <table className="flip-card-table">
                      <thead>
                        <tr className="card-name">
                          <th colSpan="2">{name}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {set.name && (
                          <tr className="card-set">
                            <td>Set:</td>
                            <td>{set.name}</td>
                          </tr>
                        )}
                        {type && (
                          <tr className="card-type">
                            <td>Type:</td>
                            <td>{type}</td>
                          </tr>
                        )}
                        {subtypes && (
                          <tr>
                            <td>SubTypes:</td>
                            <td>{subtypes.map((st) => `${st} `)}</td>
                          </tr>
                        )}
                        {attributes && (
                          <tr className="card-attr">
                            <td>Attributes:</td>
                            <td>
                              {attributes.map((st, i, arr) => {
                                if (arr.length - 1 === i) {
                                  return `${st}`;
                                } else {
                                  return `${st}, `;
                                }
                              })}
                            </td>
                          </tr>
                        )}

                        {rarity && (
                          <tr className="card-rarity">
                            <td>Rarity:</td>
                            <td>{rarity}</td>
                          </tr>
                        )}
                        {power && (
                          <tr className="card-power">
                            <td>Power:</td>
                            <td>{power}</td>
                          </tr>
                        )}
                        {health && (
                          <tr className="card-health">
                            <td>Health:</td>
                            <td>{health}</td>
                          </tr>
                        )}
                        {cost && (
                          <tr className="card-cost">
                            <td>Cost:</td>
                            <td>{cost}</td>
                          </tr>
                        )}
                        {soulSummon && (
                          <tr className="card-summon">
                            <td>Soul Summon:</td>
                            <td>{soulSummon}</td>
                          </tr>
                        )}
                        {soulTrap && (
                          <tr className="card-trap">
                            <td>Soul Trap:</td>
                            <td>{soulTrap}</td>
                          </tr>
                        )}
                      </tbody>
                      <tfoot>
                        <tr className="card-text">
                          <th colSpan="2">{text}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cards;
