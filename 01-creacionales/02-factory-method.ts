/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from '../helpers/colors.ts'

interface Burger {
  prepare(): void
}

class ChickenBurger implements Burger {
  prepare(): void {
    console.log('Preparing a %cchicken burger', COLORS.yellow)
  }
}

class BeefBurger implements Burger {
  prepare(): void {
    console.log('Preparing a %cbeef burger', COLORS.brown)
  }
}

class BeenBurger implements Burger {
  prepare(): void {
    console.log('Preparing a %cbeen burger', COLORS.red)
  }
}

abstract class Restaurant {
  protected abstract createBurger(): Burger

  orderBurger(): void {
    const hamburger = this.createBurger()
    hamburger.prepare()
  }
}

class ChickenRestaurant extends Restaurant {
  createBurger(): Burger {
    return new ChickenBurger()
  }
}

class BeefRestaurant extends Restaurant {
  createBurger(): Burger {
    return new BeefBurger()
  }
}

class BeenRestaurant extends Restaurant {
  createBurger(): Burger {
    return new BeenBurger()
  }
}

function main() {
  let restaurant: Restaurant

  const burgerType = prompt('¿What kind of burger do you want? (chicken, beef, been)?')

  switch (burgerType) {
    case 'chicken':
      restaurant = new ChickenRestaurant()
      break

    case 'beef':
      restaurant = new BeefRestaurant()
      break

    case 'been':
      restaurant = new BeenRestaurant()
      break

    default:
      throw new Error('Invalid burger type')
  }

  restaurant.orderBurger()
}

main()
