import { VerifyValidVATORequest, VerifyValidVATOResponse } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IVATOReadableRepository extends IReadableRepository {
  verifyVATO(request: VerifyValidVATORequest): Observable<VerifyValidVATOResponse>;
}
