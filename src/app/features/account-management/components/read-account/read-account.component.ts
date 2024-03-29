import { Component } from '@angular/core';
import { ReadAccount, ResetPassword, ResetPasswordRequest} from '../../models/registerAccount';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountManagementService } from '../../../../shared/services/account-management.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';

/**
 * Composant responsable de l'affichage des informations d'un utilisateur spécifique
 */
@Component({
  selector: 'app-read-account',
  templateUrl: './read-account.component.html',
  styleUrls: ['./read-account.component.scss']
})
export class ReadAccountComponent {

  /**
   * Objet contenant les informations de l'utilisateur
   */
  readAccount : ReadAccount | undefined;

    /**
   * Objet contenant les informations pour le reset du password
   */
  resetPasswordRequest : ResetPasswordRequest  | undefined;

  /**
   * Constructeur du composant
   * 
   * @param _activeRoute injection de dépendance au service permettant de reprendre des informations dans la route
   * @param _accountManagementService injection de dépendance du service qui gère les utilisateur
   * @param _router injection de dépendance du service en charge des redirections de page
   * @param _authService injection de dépendance du service d'authentification
   */
  constructor(
    private _activeRoute : ActivatedRoute, 
    private _accountManagementService : AccountManagementService,
    private _router : Router,
    private _authService : AuthService
    ) {
    let accoundId = +this._activeRoute.snapshot.params['id'];

    this._accountManagementService.getById(accoundId).subscribe({
      next: (res) => {
        this.readAccount = res;
      },
      error: (err) => {
        console.log(err);
        this._router.navigateByUrl('/notfound');
      }
    });
  }

  /**
   * fonction servant à afficher les buttons nécessitant les droits secrétaire ou admin
   * 
   * @returns vrai si admin ou secrétaire | false
   */
  displaySecretaryButton() : boolean{
    return this._authService.hasSecretaryRight();
  }

  /**
   * fonction servant à afficher les buttons nécessitant les droits secrétaire ou admin ou uniquement si la page concerne l'utilisateur connecté
   * 
   * @returns vrai si admin ou secrétaire ou utilisateur connecté | false
   */
  displayUserButton() : boolean {
    return this._authService.isUserLookForHimself(this.readAccount?.username) || this._authService.hasSecretaryRight();
  }
  
  /**
   * Méthode pour faire la requête d'envoi d'un mail pour reset son mot de passe
   */
  resetRequestButton() : void {
    if(this.readAccount != undefined)
    {
      let resetRequest : ResetPasswordRequest = {
        login : this.readAccount!.username,
        email : this.readAccount!.email
      }

      this._accountManagementService.resetPasswordRequest(resetRequest).subscribe({
        next : (value) => {},
        error : (value) => {}
      })
    }
  }

  /**
   * Méthode de démande de désactivation de l'utilisateur
   * 
   * @param id l'identifiant de l'utilisateur à désactivé
   */
  deleteUser(id : number) : void {
    this._accountManagementService.delete(id).subscribe({
      next: (response) => {
        console.log("Utilisateur supprimé avec succès:", response);
        this._router.navigateByUrl('/list-account');
      },
      error: (error) => {
        console.error("Une erreur s'est produite lors de la suppression de l'utilisateur:", error);
      },
      complete: () => {
        console.log("Suppression de l'utilisateur terminée.");
      }
    });
  }
}

