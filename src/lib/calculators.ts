import type { GunDefinition } from "@suroi/common/src/definitions/guns";
import { lineIntersectsCircle } from "@suroi/common/src/utils/math";
import { v, vAdd, vRotate } from "@suroi/common/src/utils/vector";

const playerRadius: number = 2.25;

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

export function averageDamageFromRanges(gun: GunDefinition, amount: number, min: number, max: number, increments: number) {
  const increment = (max - min) / increments;
  let damages: any[] = []

  for (let i = 0; i <= increments; i++) {
    damages.push(
      {
        x: min + i * increment,
        y: averageDamage(gun, amount, min + i * increment)
      })
  }
  return damages;
}