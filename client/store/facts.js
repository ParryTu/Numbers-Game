import jquery from "jquery";

/**
 * ACTION TYPES
 */
const GET_FACT = "GET_FACT";

/**
 * ACTION CREATORS
 */
const setFact = (fact) => ({ type: GET_FACT, fact });

/**
 * THUNK CREATORS
 */

export const loadFact =
  (mode = 20) =>
  async (dispatch) => {
    try {
      let num = Math.floor(Math.random() * mode) || mode;
      const triviaFact = await jquery.getJSON(
        `http://numbersapi.com/${num}/trivia`,
        function (data) {
          console.log(data);
        }
      );

      console.log(triviaFact.promise.responseText);
      return dispatch(setFact(triviaFact.promise.responseText));
    } catch (err) {
      const triviaFact = err;
      return dispatch(setFact(triviaFact.responseText));
    }
  };

/**
 * REDUCER
 */
export default function (state = "no fact here!", action) {
  switch (action.type) {
    case GET_FACT:
      return action.fact;
    default:
      return state;
  }
}
