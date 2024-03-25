class Fighter{
	
	
	constructor(type){
		if(type == "bob"){
			this.kind = "bob";
		} else {
			this.kind = "pat";
		}
		const strength = this.randomizeStrength();
		this.strength = strength;
		this.animationDirection = this.animationDirection(type);
		this.strengthAndKind = this.StrengthAndKindProperty(strength, type);
		this.fought = false;
	}
	

	
	randomizeStrength(){
		const indicator = Math.floor(Math.random() * 2)+1;
		if(indicator == 1){
			return "Weak";//weakSpongebob
		} else {
			return "Strong";//strongSpongebob
		}
	}
		
	animationDirection(type){
		if(type == "bob"){
			return -1;
		} else{
			return 1;
		}
	}
		
	StrengthAndKindProperty(strength, type){
		if(strength == "Strong"){
			if(type == "bob"){
				return "StrongBob";
			} else{
				return "StrongPat";
			}
		} else{
			if(type == "bob"){
				return "WeakBob";
			} else{
				return "WeakPat";
			}
		}
	}
	
	getPath(){
		if(this.strengthAndKind == "WeakBob"){
			return "./static/weakSpongebob.png";
		}
			
		if(this.strengthAndKind == "StrongBob"){
			return "./static/mascularSpongebob.png";
		}
			
		if(this.strengthAndKind == "WeakPat"){
			return "./static/weakPatrick.png";
		}
			
		if(this.strengthAndKind == "StrongPat"){
			return "./static/mascularPatrick.png";
		}
	}
	
	
	fight(other){
		let scoreThis = -1;
		let scoreOther = -1;
		
		if(this.isWeak(this)){
			scoreThis = 0;
		} else{
			scoreThis = 1;
		}
		
		if(this.isWeak(other)){
			scoreOther = 0;
		} else{
			scoreOther = 1;
		}
		
		if(scoreThis>scoreOther){
			return this.kind;
		} else if (scoreThis == scoreOther){
			return "tie";
		} else{
			return other.kind;
		}
		
		
	}
	
	isWeak(fighter){
			if(fighter.strength == "Weak"){
				return true;
			} else{
				return false;
			}
	}
}