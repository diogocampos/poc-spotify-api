const express = require('express')
const uuidv4 = require('uuid/v4')

const router = express.Router()

const STEPS = {
  start: {
    title: 'Checkout',
    fields: ['cpf', 'email'],
    next: 'cadastro',
  },
  cadastro: {
    title: 'Cadastro',
    fields: ['name', 'cpf', 'phone', 'birthDate'],
    next: 'pagamento',
  },
  pagamento: {
    title: 'Pagamento',
    fields: ['cardNumber', 'cardHolder', 'expirationDate', 'cvv'],
    next: 'resumo',
  },
  resumo: {
    title: 'Resumo',
    next: 'finalize',
  },
}

router.get('/:linkId', async (req, res, next) => {
  try {
    const { linkId } = req.params

    // TODO: valida a existência do link e retorna 404 se não existe

    const responseBody = {
      step: STEPS.start,
    }

    res.json(responseBody)
  } catch (err) {
    next(err)
  }
})

router.put('/step/start', async (req, res, next) => {
  try {
    const {
      linkId,
      data: { cpf, email },
    } = req.body

    // TODO: busca dados do link
    // TODO: valida cpf/email fornecido e retorna 401 se for incorreto

    const nextStep = STEPS.start.next

    const responseBody = {
      acessToken: uuidv4(),
      step: STEPS[nextStep],
    }

    res.json(responseBody)
  } catch (err) {
    next(err)
  }
})

router.put('/step/:step', async (req, res, next) => {
  try {
    const { step } = req.params
    const { linkId, accessToken, data } = req.body

    // TODO: valida linkId/accessToken
    // TODO: valida e salva os dados informados

    const nextStep = STEPS[step].next

    const responseBody = {
      step: STEPS[nextStep],
    }

    res.json(responseBody)
  } catch (err) {
    next(err)
  }
})

router.put('/finalize', async (req, res, next) => {
  try {
    // ...

    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

module.exports = router
