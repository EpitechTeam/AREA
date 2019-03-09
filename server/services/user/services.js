let Facebook	= require('./../../models/Facebook')
let Calendar	= require('./../../models/Calendar')
var Intra = require('./../../models/intra')
let Meteo	= require('./../../models/Meteo')
let One_drive	= require('./../../models/One-drive')
let Outlook	= require('./../../models/Outlook')
var Twitter = require('./../../models/Twitter')
let User	= require('./../../models/User')
let Service	= require('./../../models/Services')

let facebook = async(token) => {
	let one = {
		name : "Facebook",
		actions : [],
		reactions : []
	}

		let actions = {
			name : "event",
			description : "Quand un utilisateur participe a un evenement"
		}
		one.actions.push(actions)

		actions = {
			name : "photos",
			description : "Quand un utilisateur ajoute une photo de couverture ou de profil"
		}
		one.actions.push(actions)

		actions = {
			name : "post",
			description : "Quand un utilisateur post un status"
		}
		one.actions.push(actions)

		actions = {
			name : "ajout d'ami",
			description : "Quand un utilisateur ajoute un ami"
		}
		one.actions.push(actions)

		actions = {
			name : "work",
			description : "Quand un utilisateur change sa section travaille"
		}
		one.actions.push(actions)

		actions = {
			name : "location",
			description : "Quand un utilisateur change sa localisation"
		}
		one.actions.push(actions)

		actions = {
			name : "homeTown",
			description : "Quand un utilisateur change sa ville de naissance"
		}
		one.actions.push(actions)

		actions = {
			name : "education",
			description : "Quand un utilisateur change sa section education"
		}
		one.actions.push(actions)

		actions = {
			name : "religion",
			description : "Quand un utilisateur change sa section religion"
		}
		one.actions.push(actions)

			actions = {
				name : "Outlook mail",
				description : "Envoi d'un mail avec des informations sur l'actions"
			}
			one.reactions.push(actions)


		actions = {
			name : "Twitter",
			description : "Tweet le contenu de l'action"
		}
		one.reactions.push(actions)

		actions = {
			name : "Calendar",
			description : "Creer un evenement sur votre calendrier office365"
		}
		one.reactions.push(actions)
	// one.reactions.push(actions)
	return (one)
}

let intra = async (token) => {
  let one = {
    name : "Intra",
    actions : [],
    reactions : []
  }

    let actions = {
      name : "GPA",
      description : "Envoi une notification quand votre GPA a changé"
    }
    one.actions.push(actions)

    actions = {
      name : "Notification de l'intra",
      description : "Envoi des notifications de l'intranet"
    }
    one.actions.push(actions)

    actions = {
      name : "Planning",
      description : "Recevez des informations concernant votre planning"
    }
    one.actions.push(actions)

    let reactions = {
      name : "Mail",
      description : "Envoi de l'action par mail"
    }
    one.reactions.push(reactions)

    reactions = {
      name : "Calendar",
      description : "Mise en place de vos activités sur votre calendrier office365"
    }
    one.reactions.push(reactions)


  return (one)
}

let twitter = async (token) => {
  let one = {
    name : "Twitter",
    actions : [],
    reactions : []
  }

    let actions = {
      name : "Tweet",
      description : "Quand un utilisateur tweet"
    }
    one.actions.push(actions)
    actions = {
      name : "Follow",
      description : "Quand un utilisateur commence a follow un autre membre"
    }
    one.actions.push(actions)

    actions = {
      name : "Get Followed",
      description : "Quand un utilisateur recois un nouveau abonné"
    }
    one.actions.push(actions)

    actions = {
      name : "Unfollow",
      description : "Quand un utilisateur se désabonne"
    }
    one.actions.push(actions)

    let reactions = {
      name : "Mail",
      description : "Recois un mail avec les informations de l'actions"
    }
    one.reactions.push(reactions)

    reactions = {
      name : "Send direct message",
      description : "Envoi un message twitter"
    }
    one.reactions.push(reactions)
  return (one)
}

let mail = async (token) => {
  let one = {
    name : "Outlook",
    actions : [],
    reactions : []
  }

    let actions = {
      name : "Mail",
      description : "Récupere la piece jointe d'un mail"
    }
    one.actions.push(actions)

    let reactions = {
      name : "One drive",
      description : "Sauvegarde du fichier sur votre one drive"
    }
		one.reactions.push(reactions)

  return (one)
}

let meteo = async (token) => {
	let one = {
    name : "Meteo",
    actions : [],
    reactions : []
  }

    let actions = {
      name : "Meteo of the day",
      description : "Envoi les informations concernant la meteo de votre ville"
    }
    one.actions.push(actions)

    let reactions = {
      name : "Mail",
      description : "Envoi la meteo par mail"
    }
    one.reactions.push(reactions)

    reactions = {
      name : "Calendar",
      description : "Indique la meteo sur votre calendrier"
    }
    one.reactions.push(reactions)

    reactions = {
      name : "Twitter",
      description : "Tweet la meteo du jour"
    }
    one.reactions.push(reactions)

  return (one)
}

let lemonde = async () => {
	let one = {
		name : "Le monde",
		actions : [],
		reactions : []
	}

	let actions = {
		name : "News of the day",
		description : "Envoi des nouvelles sur lemonde.fr"
	}
	one.actions.push(actions)

	let reactions = {
		name : "Mail",
		description : "Envoi des nouvelles par mail"
	}

	one.reactions.push(reactions)

	return (one)
}

module.exports = {
  facebook,
  intra,
  twitter,
  mail,
  meteo,
	lemonde
}
