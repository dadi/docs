---
title: Collision probability
---

## Confidence scoring

confidence scores are calculated by DADI Identity over time, improving as the available sample size increases. The scores given below are from our own testing using a sample size in the low millions of users in a multi-product setup.

Different audience profiles will yield different results, especially in single-product setups.

_Note: UUIDs are issued with a gaurentee of uniqueness. Confidence scoring **only applies** to fingerprints_

### Performance comparisons

#### Version 0.8 (previous build)

| What | Sample size (000's) | Matches (000's) | Collisions (000's) | Confidence score |
|------|---------------------|-----------------|------------|------------------|
| Device fingerprint uniqueness | 4,812 | 3,829 | 983 | 79.57% |
| +geo fingerprint | 4,812 | 4,519 | 293 | 93.91% |
| +network fingerprint | 4,812 | 4,544 | 268 | 94.43% |
| +providor fingerprint | 4,812 | 4,572 | 240 | 95.01% |
| +language fingerprint | 4,812 | 4,576 | 236 | 95.10% |
| +agent fingerprint | 4,812 | 4,579 | 233 | 95.16% |
| +protocol fingerprint | 4,812 | 4,647 | 165 | 96.57% |
| Issued UUID | 4,812 | 4,812 | 0 | 100.00% |

#### Version 1.0 (current build)

| What | Sample size (000's) | Matches (000's) | Collisions (000's) | Confidence score |
|------|---------------------|-----------------|------------|------------------|
| Device fingerprint uniqueness | 5,500 | 4,743 | 757 | 86.24% |
| +geo fingerprint | 3,526 | 3,375 | 151 | 95.72% |
| +network fingerprint | 3,524 | 3,394 | 130 | 96.31% |
| +providor fingerprint | 3,524 | 3,399 | 125 | 96.45% |
| +language fingerprint | 3,523 | 3,399 | 124 | 96.48% |
| +agent fingerprint | 3,517 | 3,399 | 118 | 96.64% |
| +protocol fingerprint | 3,512 | 3,426 | 86 | 97.55% |
| Issued UUID | 3,500 |3,500 | 0 | 100.00% |
