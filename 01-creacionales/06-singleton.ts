/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

class DragonBalls {
  private static instance: DragonBalls
  private collectedBalls: number

  private constructor() {
    this.collectedBalls = 0
  }

  public static getInstance(): DragonBalls {
    if (!DragonBalls.instance) {
      DragonBalls.instance = new DragonBalls()
    }

    return DragonBalls.instance
  }

  collectBall(): void {
    if (this.collectedBalls < 7) {
      this.collectedBalls++
      console.log(`Balls collected: ${this.collectedBalls}`)
      return
    }

    console.log('You have collected all the balls')
  }

  summonShenLong(): void {
    if (this.collectedBalls === 7) {
      console.log('Shen Long has been summoned, make your wish')
      this.collectedBalls = 0
      return
    }

    console.log(`You need to collect all the balls, missing: ${7 - this.collectedBalls}`)
  }
}

function main() {
  const dragonBalls = DragonBalls.getInstance()

  dragonBalls.collectBall()
  dragonBalls.collectBall()
  dragonBalls.collectBall()

  dragonBalls.summonShenLong()
}

main()
