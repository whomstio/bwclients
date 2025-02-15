import { DialogConfig, DialogRef, DIALOG_DATA } from "@angular/cdk/dialog";
import { Component, Inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";

import {
  UserVerificationPromptComponent as BaseUserVerificationPrompt,
  UserVerificationPromptParams,
} from "@bitwarden/angular/auth/components/user-verification-prompt.component";
import { UserVerificationService } from "@bitwarden/common/auth/abstractions/user-verification/user-verification.service.abstraction";
import { I18nService } from "@bitwarden/common/platform/abstractions/i18n.service";
import { PlatformUtilsService } from "@bitwarden/common/platform/abstractions/platform-utils.service";
import { DialogService } from "@bitwarden/components";

@Component({
  templateUrl: "user-verification-prompt.component.html",
})
export class UserVerificationPromptComponent extends BaseUserVerificationPrompt {
  constructor(
    @Inject(DIALOG_DATA) data: UserVerificationPromptParams,
    private dialogRef: DialogRef<boolean>,
    userVerificationService: UserVerificationService,
    formBuilder: FormBuilder,
    platformUtilsService: PlatformUtilsService,
    i18nService: I18nService,
  ) {
    super(null, data, userVerificationService, formBuilder, platformUtilsService, i18nService);
  }

  override close(success: boolean) {
    this.dialogRef.close(success);
  }
}

/**
 * Strongly typed helper to open a UserVerificationPrompt
 * @param dialogService Instance of the dialog service that will be used to open the dialog
 * @param config Configuration for the dialog
 */
export const openUserVerificationPrompt = (
  dialogService: DialogService,
  config: DialogConfig<UserVerificationPromptParams>,
) => {
  return dialogService.open<boolean, UserVerificationPromptParams>(
    UserVerificationPromptComponent,
    config,
  );
};
