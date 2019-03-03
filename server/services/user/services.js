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
	var user = await User.findOne({token : token});
	var services = await Service.findOne({"_id" : user.services})

	if (!services.facebook) {
		return ;
	}

	var fu = await Facebook.findOne({"_id" : services.facebook})
	if (fu.eventToTwitter || fu.eventToEmail || fu.eventToCalendar ||
		fu.photosToTwitter || fu.photosToEmail || fu.statusToEmail || fu.statusToTwitter
		|| fu.statusToEmail || fu.statusToTwitter || fu.friendsToEmail || fu.workToEmail
		|| fu.locationToEmail || fu.hometownToEmail || fu.educationToEmail || fu.religionToEmail)
		{

		}
		else {
			return;
		}


	let one = {
		name : "Facebook",
		actions : [],
		reactions : []
	}

	if (fu.eventToTwitter || fu.eventToEmail || fu.eventToCalendar) {
		let actions = {
			name : "event",
			description : "Quand un utilisateur participe a un evenement"
		}
		one.actions.push(actions)
	}
	if (fu.photosToTwitter || fu.photosToEmail) {
		let actions = {
			name : "photos",
			description : "Quand un utilisateur ajoute une photo de couverture ou de profil"
		}
		one.actions.push(actions)
	}
	if (fu.statusToEmail || fu.statusToTwitter) {
		let actions = {
			name : "post",
			description : "Quand un utilisateur post un status"
		}
		one.actions.push(actions)
	}
	if (fu.friendsToEmail) {
		let actions = {
			name : "ajout d'ami",
			description : "Quand un utilisateur ajoute un ami"
		}
		one.actions.push(actions)
	}
	if (fu.workToEmail) {
		let actions = {
			name : "work",
			description : "Quand un utilisateur change sa section travaille"
		}
		one.actions.push(actions)
	}
	if (fu.locationToEmail) {
		let actions = {
			name : "location",
			description : "Quand un utilisateur change sa localisation"
		}
		one.actions.push(actions)
	}
	if (fu.hometownToEmail) {
		let actions = {
			name : "homeTown",
			description : "Quand un utilisateur change sa ville de naissance"
		}
		one.actions.push(actions)
	}
	if (fu.educationToEmail) {
		let actions = {
			name : "education",
			description : "Quand un utilisateur change sa section education"
		}
		one.actions.push(actions)
	}
	if (fu.religionToEmail) {
		let actions = {
			name : "religion",
			description : "Quand un utilisateur change sa section religion"
		}
		one.actions.push(actions)
	}

	if (fu.eventToEmail || fu.photosToEmail || fu.statusToEmail || fu.friendsToEmail
		|| fu.workToEmail || fu.locationToEmail || fu.hometownToEmail || fu.educationToEmail || fu.religionToEmail) {
			let actions = {
				name : "Outlook mail",
				description : "Envoi d'un mail avec des informations sur l'actions"
			}
			one.reactions.push(actions)
		}
	if (fu.eventToTwitter || fu.photosToTwitter) {
		let actions = {
			name : "Twitter",
			description : "Tweet le contenu de l'action"
		}
		one.reactions.push(actions)
	}
	if (fu.eventToCalendar) {
		let actions = {
			name : "Calendar",
			description : "Creer un evenement sur votre calendrier office365"
		}
		one.reactions.push(actions)
	}
	// one.reactions.push(actions)
	return (one)
}

let intra = async (token) => {
  var user = await User.findOne({token : token});
  var services = await Service.findOne({"_id" : user.services})

  if (!services.intra) {
    return ;
  }

  var iu = await Intra.findOne({"_id" : services.intra})

  if (iu.GPAChange || iu.messageNotificationByMail || iu.activityToEmail || iu.activityToEmail) {

  }
  else {
    return;
  }

  let one = {
    name : "Intra",
    actions : [],
    reactions : []
  }

  if (iu.GPAChange) {
    let actions = {
      name : "GPA",
      description : "Envoi une notification quand votre GPA a changé"
    }
    one.actions.push(actions)
  }
  if (iu.messageNotificationByMail) {
    let actions = {
      name : "Notification de l'intra",
      description : "Envoi des notifications de l'intranet"
    }
    one.actions.push(actions)
  }
  if (iu.activityToEmail || iu.activityToCalendar) {
    let actions = {
      name : "Planning",
      description : "Recevez des informations concernant votre planning"
    }
    one.actions.push(actions)
  }

  if (iu.messageNotificationByMail || iu.activityToEmail || iu.GPAChange) {
    let reactions = {
      name : "Mail",
      description : "Envoi de l'action par mail"
    }
    one.reactions.push(reactions)
  }
  if (iu.activityToCalendar) {
    let reactions = {
      name : "Calendar",
      description : "Mise en place de vos activités sur votre calendrier office365"
    }
    one.reactions.push(reactions)
  }


  return (one)
}

let twitter = async (token) => {
  var user = await User.findOne({token : token});
	var services = await Service.findOne({"_id" : user.services})

	if (!services.twitter) {
		return ;
	}

	var tu = await Twitter.findOne({"_id" : services.twitter})

  if (tu.tweetByMail || tu.startFollowByMail || tu.getFollowByMail || tu.getUnfollowByMail || tu.startFollowSendDirectMessage) {

  }
  else {
    return;
  }

  let one = {
    name : "Twitter",
    actions : [],
    reactions : []
  }

  if (tu.tweetByMail) {
    let actions = {
      name : "Tweet",
      description : "Quand un utilisateur tweet"
    }
    one.actions.push(actions)
  }
  if (tu.startFollowByMail) {
    let actions = {
      name : "Follow",
      description : "Quand un utilisateur commence a follow un autre membre"
    }
    one.actions.push(actions)
  }
  if (tu.getFollowByMail || tu.startFollowSendDirectMessage) {
    let actions = {
      name : "Get Followed",
      description : "Quand un utilisateur recois un nouveau abonné"
    }
    one.actions.push(actions)
  }
  if (tu.getUnfollowByMail) {
    let actions = {
      name : "Unfollow",
      description : "Quand un utilisateur se désabonne"
    }
    one.actions.push(actions)
  }

  if (tu.tweetByMail || tu.startFollowByMail || tu.getFollowByMail || tu.getUnfollowByMail) {
    let reactions = {
      name : "Mail",
      description : "Recois un mail avec les informations de l'actions"
    }
    one.reactions.push(reactions)
  }

  if (tu.startFollowSendDirectMessage) {
    let reactions = {
      name : "Send direct message",
      description : "Envoi un message twitter"
    }
    one.reactions.push(reactions)
  }
  return (one)
}

let mail = async (token) => {
  var user = await User.findOne({token : token});
  var services = await Service.findOne({"_id" : user.services})

  if (!services.outlook) {
    return ;
  }

  var ou = await Outlook.findOne({"_id" : services.outlook})

  if (ou.fileToOneDrive) {

  }
  else {
    return;
  }

  let one = {
    name : "Outlook",
    actions : [],
    reactions : []
  }

  if (ou.fileToOneDrive) {
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
  }

  return (one)
}

let meteo = async (token) => {
  var user = await User.findOne({token : token});
  var services = await Service.findOne({"_id" : user.services})

  if (!services.meteo) {
    return ;
  }

  var mu = await Meteo.findOne({"_id" : services.meteo})

  if (mu.toEmail || mu.toCalendar || mu.toTwitter) {

  }
  else {
    return;
  }

  let one = {
    name : "Meteo",
    actions : [],
    reactions : []
  }

  if (mu.toEmail || mu.toCalendar || mu.toTwitter) {
    let actions = {
      name : "Meteo of the day",
      description : "Envoi les informations concernant la meteo de votre ville"
    }
    one.actions.push(actions)
  }

  if (mu.toEmail) {
    let reactions = {
      name : "Mail",
      description : "Envoi la meteo par mail"
    }
    one.reactions.push(reactions)
  }
  if (mu.Calendar) {
    let reactions = {
      name : "Calendar",
      description : "Indique la meteo sur votre calendrier"
    }
    one.reactions.push(reactions)
  }
  if (mu.toTwitter) {
    let reactions = {
      name : "Twitter",
      description : "Tweet la meteo du jour"
    }
    one.reactions.push(reactions)
  }

  return (one)
}

module.exports = {
  facebook,
  intra,
  twitter,
  mail,
  meteo
}
