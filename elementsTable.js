// Esta funcion crea el encabezado con DOM 
const encabezadoTable = () => {
  const titleHead = ['#', 'Pokemon', 'Tipo', 'Habilidades', 'Imagen', '']

  const thead = document.createElement('thead')
  const tr = document.createElement('tr')

  for(let i = 0; i < titleHead.length; i++) {
    const th = document.createElement('th')
    th.innerText = titleHead[i]
    tr.append(th)
  }

  thead.append(tr)
  
  return thead
}

// Esta funcio se exporta y es la que junta el encabezado y tambien crea el cuerpo de la tabla
// sin datos
export const table = (cantRows) => {
  const table = document.createElement("table")
  table.setAttribute("id", "table-pokemons")
  table.setAttribute("class", "table table-striped")

  table.append(encabezadoTable())

  const cantColums = 6
  const tbody = document.createElement('tbody')

  for (let i=0; i < cantRows; i++) {
    const tr = document.createElement("tr")
    tr.setAttribute("class", "placeholder-glow")
    for (let f=0; f < cantColums; f++) {
      const td = document.createElement("td")
      td.setAttribute("id", `poke-${i}`)
      if (f == 5){
        const button = document.createElement("button")
        button.setAttribute("class", "placeholder btn btn-secondary disabled")
        td.append(button)
      } else {
        const span = document.createElement("span")
        span.setAttribute("class", "placeholder placeholder--text-normal")
        if (f == 0) {
          span.classList.remove("placeholder--text-normal")
          span.classList.add("placeholder--text-small")
        }
        td.append(span)
      }
      tr.append(td)
    }
    tbody.append(tr)
  }
  table.append(tbody)
  return table
}

// Esta funcion se exporta y es el que remplaza datos en la tabla
// con datos de la pokeapi
export const paintDataInTable = (pokemon, i) => {
  const options = document.querySelectorAll(`#poke-${i}`)

  options.forEach(async (option, index) => {
    if(index == 0) {
      option.innerText = pokemon.id
    } else if(index == 1) {
      option.innerText = pokemon.name
    } else if(index == 2) {
      pokemon.types.forEach((typePokemon, index) => {
        option.innerText += typePokemon.type.name
        if (index < pokemon.types.length - 1) {
          option.innerText += ", "
        }
      })
    } else if (index == 3) {
      pokemon.abilities.forEach((abilitiPokemon, index) => {
        option.innerText += abilitiPokemon.ability.name
        if (index < pokemon.abilities.length - 1) {
          option.innerText += ", "
        }
      })
    } else if (index == 4) {
      option.innerHTML = `<img src=${pokemon.sprites.other["official-artwork"].front_default} alt=${pokemon.name} width="60">
      `
    } else if (index == 5) {
      const btn = option.querySelector("button")
      btn.setAttribute("class", "btn btn-secondary")
      btn.innerText = "Ver más"
    }
  })
}

