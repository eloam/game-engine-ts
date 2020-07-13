# Roadmap

## 1. Gestion des collisions

- Ajout d'un system de gestion des collisions (colliders) levant un évenement dans l'objet Sprite lorsque:
    - Un sprite rentre pour la première fois en collision avec un autre Sprite
    - Un sprite rentre en collision avec un autrer Sprite
    - Un sprite quitte la collision avec un autre Sprite


- Ajout d'une classe `ColliderManager` gerant les différents types de collisions :
    - `BoxCollider`, `CircleCollider` qui héritent de la classe `Collider`

## 2. Gestion des animations

- Ajout d'un système de gestion des animations avec les gestions des images clé par rapport à un temps données, calcul du temps entre deux frames...
- Les animations peuvent être jouées en "one-shot" ou répétées une ou plusieurs fois.
- Ajout de la classe `KeyframeAnimation`

## 3. Gestion des scènes

- Ajout d'une classe `SceneManager` permettant la gestion d'une ou de plusieurs scènes
- Chaque scène sera consistué d'un canvas

## 4. Gestion de la caméra

- Ajout de la gestion de la caméra permettant de modifier la position des différents sprites du scènes en fonction de sa position
