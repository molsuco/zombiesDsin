import React, { useState } from 'react'
import { Box, Button, TextField } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import { addHost } from 'requests'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import useStyles from './styles'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const RegisterForm = () => {
  const DEFAULT_VALUES = {
    age: '',
    sex: 'MALE',
    weight: '',
    height: '',
    bloodType: 'A_POSITIVE',
    musicalGenre: 'POP',
    sport: 'FUTEBOL',
    game: 'COUNTER_STRIKE',
  }

  const [request, setRequest] = useState(DEFAULT_VALUES)
  const [response, setResponse] = useState({})

  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })

  const onlyIntHandle = (field, value) => {
    if (!isNaN(value)) {
      setRequest({ ...request, [field]: parseInt(value) })
    }
    if (!value) {
      setRequest({ ...request, [field]: value })
    }
  }

  const onlyFloatHandle = (field, value) => {
    if (!isNaN(value) && Number(value).countDecimals() <= 2) {
      setRequest({ ...request, [field]: value })
    }
    if (!value) {
      setRequest({ ...request, [field]: value })
    }
  }

  const removeDot = (field, value) => {
    if (value && value.slice(-1) == '.') {
      setRequest({ ...request, [field]: value.slice(0, -1) })
    }
  }

  Number.prototype.countDecimals = function () {
    if (Math.floor(this.valueOf()) === this.valueOf()) return 0
    return this.toString().split('.')[1].length || 0
  }

  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent)

  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions)

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    )
  })

  const [open, setOpen] = useState(false)

  const classes = useStyles()

  const onSubmit = async () => {
    try {
      if (request.age == '' || request.weight == '' || request.height == '') {
        alert('Preencha todos os campos!')
      } else {
        addHost(request).then((resp) => {
          setResponse({
            strength: resp.strength,
            speed: resp.speed,
            intelligence: resp.intelligence,
          })
        })
        setOpen(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onClose = async () => {
    setOpen(false)
    setRequest(DEFAULT_VALUES)
  }

  return (
    <form className={classes.styledForm}>
      <TextField
        className={classes.inputs}
        label="Idade"
        variant="outlined"
        value={request.age}
        onChange={(event) => onlyIntHandle('age', event.target.value)}
        style={{ width: '100px' }}
      />
      <FormControl variant="outlined" className={classes.inputs} style={{ width: '200px' }}>
        <InputLabel id="sexoLabel">Sexo</InputLabel>
        <Select
          labelId="sexoLabel"
          value={request.sex}
          onChange={(event) => setRequest({ ...request, sex: event.target.value })}
          label="Sexo"
        >
          <MenuItem value={'MALE'}>Masculino</MenuItem>
          <MenuItem value={'FEMALE'}>Feminino</MenuItem>
          <MenuItem value={'UNKNOWN'}>Não informar</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Peso"
        variant="outlined"
        onBlur={(event) => removeDot('weight', event.target.value)}
        className={classes.inputs}
        value={request.weight}
        onChange={(event) => onlyFloatHandle('weight', event.target.value)}
        style={{ width: '150px' }}
      />
      <TextField
        label="Altura"
        className={classes.inputs}
        variant="outlined"
        onBlur={(event) => removeDot('height', event.target.value)}
        value={request.height}
        onChange={(event) => onlyFloatHandle('height', event.target.value)}
        style={{ width: '150px' }}
      />
      <FormControl variant="outlined" className={classes.inputs}>
        <InputLabel id="tipoSanguineoLabel">Tipo Sanguíneo</InputLabel>
        <Select
          labelId="tipoSanguineoLabel"
          value={request.bloodType}
          onChange={(event) => setRequest({ ...request, bloodType: event.target.value })}
          label="Tipo Sanguíneo"
        >
          <MenuItem value={'A_POSITIVE'}>A+</MenuItem>
          <MenuItem value={'A_NEGATIVE'}>A-</MenuItem>
          <MenuItem value={'B_POSITIVE'}>B+</MenuItem>
          <MenuItem value={'B_NEGATIVE'}>B-</MenuItem>
          <MenuItem value={'O_POSITIVE'}>O+</MenuItem>
          <MenuItem value={'O_NEGATIVE'}>O-</MenuItem>
          <MenuItem value={'AB_POSITIVE'}>AB+</MenuItem>
          <MenuItem value={'AB_NEGATIVE'}>AB-</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.inputs}>
        <InputLabel id="generoMusicalLabel">Gênero Musical</InputLabel>
        <Select
          labelId="generoMusicalLabel"
          value={request.musicalGenre}
          onChange={(event) => setRequest({ ...request, musicalGenre: event.target.value })}
          label="Gênero Musical"
        >
          <MenuItem value={'POP'}>Pop</MenuItem>
          <MenuItem value={'ROCK'}>Rock</MenuItem>
          <MenuItem value={'PAGODE'}>Pagode</MenuItem>
          <MenuItem value={'SERTANEJO'}>Sertanejo</MenuItem>
          <MenuItem value={'HIP_HOP_RAP'}>Hip-Hop/Rap</MenuItem>
          <MenuItem value={'ELETRONICA'}>Eletrônica</MenuItem>
          <MenuItem value={'FUNK'}>Funk</MenuItem>
          <MenuItem value={'METAL'}>Metal</MenuItem>
          <MenuItem value={'ESQUIZITICE'}>Demais gêneros estranhos</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.inputs}>
        <InputLabel id="esporteLabel">Esporte</InputLabel>
        <Select
          labelId="esporteLabel"
          value={request.sport}
          onChange={(event) => setRequest({ ...request, sport: event.target.value })}
          label="Esporte"
        >
          <MenuItem value={'FUTEBOL'}>Futebol</MenuItem>
          <MenuItem value={'BASQUETE'}>Basquete</MenuItem>
          <MenuItem value={'VOLEI'}>Vôlei</MenuItem>
          <MenuItem value={'LUTA'}>Luta</MenuItem>
          <MenuItem value={'ATLETISMO'}>Atletismo</MenuItem>
          <MenuItem value={'ESPORTS'}>eSports</MenuItem>
          <MenuItem value={'NADA'}>Nada</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.inputs}>
        <InputLabel id="gameLabel">Game</InputLabel>
        <Select
          labelId="gameLabel"
          value={request.game}
          onChange={(event) => setRequest({ ...request, game: event.target.value })}
          label="Game"
        >
          <MenuItem value={'COUNTER_STRIKE'}>Counter Strike</MenuItem>
          <MenuItem value={'MINECRAFT'}>Minecraft</MenuItem>
          <MenuItem value={'FORTNITE'}>Fortnite</MenuItem>
          <MenuItem value={'THE_WITCHER'}>The Witcher</MenuItem>
          <MenuItem value={'VALORANT'}>Valorant</MenuItem>
          <MenuItem value={'ASSASSINS_CREED'}>Assassin's Creed</MenuItem>
          <MenuItem value={'WORLD_OF_WARCRAFT'}>World of Warcraft</MenuItem>
          <MenuItem value={'FIFA'}>FIFA</MenuItem>
          <MenuItem value={'LEAGUE_OF_LEGENDS'}>League of Legends</MenuItem>
          <MenuItem value={'DOTA'}>Dota</MenuItem>
          <MenuItem value={'ROCKET_LEAGUE'}>Rocket League</MenuItem>
          <MenuItem value={'OUTRO'}>Outro - pouco relevante</MenuItem>
        </Select>
      </FormControl>
      <Box mt={2} className={classes.actionBox}>
        <Button variant="outlined" onClick={onSubmit} className={classes.ButtonHover}>
          Cadastrar hospedeiro
        </Button>
      </Box>
      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={onClose} style={{ backgroundColor: '#330d00' }}>
          <center style={{ color: '#fcf000' }}>
            <strong>Hospedeiro cadastrado!</strong>
          </center>
        </DialogTitle>
        <DialogContent dividers style={{ backgroundColor: '#fefaad' }}>
          <Typography gutterBottom>
            <center style={{ color: 'black' }}>
              <p style={{ width: '400px' }}>
                Se algum dia, caso queira o destino, essa pessoa se tornar um zumbi, esses serão seus atributos:
              </p>
              <strong>Força: {response.strength}</strong>
              <br />
              <strong>Velocidade: {response.speed}</strong>
              <br />
              <strong>Inteligência: {response.intelligence}</strong>
            </center>
          </Typography>
        </DialogContent>
        <DialogActions
          style={{
            backgroundColor: '#fefaad',
            display: 'flex',
            placeItems: 'center',
            justifyContent: 'center',
            padding: '15px',
          }}
        >
          <Button autoFocus onClick={onClose} variant="outlined" className={classes.ButtonHover}>
            Obrigado! (eu acho...)
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  )
}
export default RegisterForm
