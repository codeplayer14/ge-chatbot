const getSlots = slots => {
  slotArray = [];

  slots.forEach(slot => {
    const key = Object.keys(slot)[0];
    slotsArray.push([
      {
        text: key,
        callback_data: key + "$" + slot.key
      }
    ]);
  });
  return slotsArray;
};
module.exports = {
  invalidEmail: {
    payload: {
      telegram: {
        text: "Email is not valid. Please type your email again."
      }
    }
  },
  optionsResponse: {
    payload: {
      telegram: {
        text: "Great. Could I please have your name?"
      }
    }
  },
  nameResponse: {
    payload: {
      telegram: {
        text: "Alright. Could you mention your address?"
      }
    }
  },
  addressResponse: {
    payload: {
      telegram: {
        text: "Okay. Could I have your area PIN Code?"
      }
    }
  },
  pinResponse: {
    payload: {
      telegram: {
        text: "Alright. Could I have your email?"
      }
    }
  },
  emailResponse: {
    payload: {
      telegram: {
        text: "Perfect. Please, Could I have your contact number?"
      }
    }
  },
  contactResponse: {
    payload: {
      telegram: {
        text: "Okay. Finally, could you describe the issue?"
      }
    }
  },
  prepareSlots: slots => {
    return {
      telegram: {
        text: "Pick an available slot",
        reply_markup: {
          inline_keyboard: getSlots(slots)
        }
      }
    };
  },

  confirmResponse: tracking_id => {
    return {
      telegram: {
        text: `Service was scheduled. Your unique tracking id is ${tracking_id}.`
      }
    };
  }
};
