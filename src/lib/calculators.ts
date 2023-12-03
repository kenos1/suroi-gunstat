import type { GunDefinition } from "@suroi/common/src/definitions/guns";
import {
  clamp,
  degreesToRadians,
  lineIntersectsCircle,
} from "@suroi/common/src/utils/math";
import {
  randomFloat,
  randomPointInsideCircle,
} from "@suroi/common/src/utils/random";
import { v, vAdd, vRotate, type Vector } from "@suroi/common/src/utils/vector";

const playerRadius: number = 2.25;

/**
 * A more realistic average of gun damage from range
 * @param gun Gun
 * @param trials Amount of shots to try
 * @param range Range in game units
 * @returns Average damage from trials
 */
export function shootGun(gun: GunDefinition, trials: number, range: number) {
  let damage = 0;

  for (let trial = 0; trial < trials; trial++) {
    const spread = degreesToRadians(gun.moveSpread / 2);
    const jitter = gun.jitterRadius ?? 0;

    let position = v(gun.length + jitter, 0);

    const limit = gun.bulletCount ?? 1;

    for (let i = 0; i < limit; i++) {
      let ray = vRotate(
        v(gun.ballistics.range, 0),
        (gun.consistentPatterning === true
          ? 2 * (i / limit - 0.5)
          : randomFloat(-1, 1)) * spread
      );

      let rayStart = jitter
        ? randomPointInsideCircle(position, jitter)
        : position;
      damage += lineIntersectsCircle(
        rayStart,
        vAdd(rayStart, ray),
        v(range, 0),
        playerRadius
      )
        ? gun.ballistics.damage
        //? gun.ballistics.damage * clamp((1 - (range / gun.ballistics.range)), 0, 1)
        //? gun.ballistics.damage * 0.5 ** (range / 100)
        : 0;
    }
  }

  return damage / trials;
}

export function shootGunFromRanges(
  gun: GunDefinition,
  trials: number,
  min: number,
  max: number,
  increments: number
) {
  const increment = (max - min) / increments;
  let damages: any[] = [];

  for (let i = 0; i <= increments; i++) {
    damages.push({
      x: min + i * increment,
      y: shootGun(gun, trials, min + i * increment),
    });
  }
  return damages;
}

/**
 * Shoots multiple rays of a gun
 * @param gun Gun
 * @param amount Amount of rays
 * @param range Range in game units
 * @returns Average damage
 */
export function averageDamage(
  gun: GunDefinition,
  amount: number,
  range: number
) {
  const incrementAngle = (gun.shotSpread + gun.moveSpread) / amount;
  const offsetAngle = (gun.shotSpread + gun.moveSpread) / -2;
  const bulletAmount = gun.bulletCount ?? 1;

  const muzzleLocation = v(gun.length, 0);

  let hits = 0;

  for (let i = 0; i < amount; i++) {
    if (
      lineIntersectsCircle(
        muzzleLocation,
        vAdd(
          muzzleLocation,
          vRotate(v(gun.ballistics.range, 0), offsetAngle + incrementAngle * i)
        ),
        v(range, 0),
        playerRadius
      )
    ) {
      hits++;
    }
  }

  return (hits * gun.ballistics.damage * bulletAmount) / amount;
}

export function averageDamageFromRanges(
  gun: GunDefinition,
  amount: number,
  min: number,
  max: number,
  increments: number
) {
  const increment = (max - min) / increments;
  let damages: any[] = [];

  for (let i = 0; i <= increments; i++) {
    damages.push({
      x: min + i * increment,
      y: averageDamage(gun, amount, min + i * increment),
    });
  }
  return damages;
}
