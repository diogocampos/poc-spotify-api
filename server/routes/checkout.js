const express = require('express')
const uuidv4 = require('uuid/v4')

const router = express.Router()

const STEPS = {
  start: {
    stepId: 'start',
    title: 'Checkout',
    fields: ['cpf', 'email'],
    button: 'Continuar',
  },
  cadastro: {
    stepId: 'cadastro',
    title: 'Cadastro',
    fields: ['name', 'cpf', 'phone', 'birthDate'],
    button: 'Continuar',
  },
  pagamento: {
    stepId: 'pagamento',
    title: 'Pagamento',
    fields: ['cardNumber', 'cardHolder', 'expirationDate', 'cvv'],
    button: 'Continuar',
  },
  finalize: {
    stepId: 'finalize',
    title: 'Resumo',
    info: '{informações de resumo do pagamento}',
    button: 'Finalizar',
  },
}

const NEXT_STEP = {
  start: 'cadastro',
  cadastro: 'pagamento',
  pagamento: 'resumo',
  resumo: 'finalize',
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

router.put('/start', async (req, res, next) => {
  try {
    const {
      linkId,
      data: { cpf, email },
    } = req.body

    // TODO: busca dados do link
    // TODO: valida cpf/email fornecido e retorna 401 se for incorreto

    const nextStep = NEXT_STEP.start

    const responseBody = {
      acessToken: uuidv4(),
      step: STEPS[nextStep],
    }

    res.json(responseBody)
  } catch (err) {
    next(err)
  }
})

router.put('/:step', async (req, res, next) => {
  try {
    const { step } = req.params
    const { linkId, accessToken, data } = req.body

    // TODO: valida linkId/accessToken
    // TODO: valida e salva os dados informados

    const nextStep = NEXT_STEP[step]
    if (nextStep === 'finalize') {
      // TODO: finaliza o pagamento
      return res.sendStatus(200)
    }

    const responseBody = {
      step: STEPS[nextStep],
    }

    res.json(responseBody)
  } catch (err) {
    next(err)
  }
})

module.exports = router
