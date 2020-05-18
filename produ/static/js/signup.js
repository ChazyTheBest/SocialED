function signup()
{
    var form = $( 'form' ),
        nickname = $( 'input[name=nickname]' ).val()
        email    = $( 'input[name=email]' ).val(),
        passwd   = $( 'input[name=passwd]' ).val(),
        confirm  = $( 'input[name=confirm]' ).val()

    if (nickname == '' || nickname == null)
    {
        alert('Debes introducir un nickname.')
        return false
    }

    if (email == '' || email == null)
    {
        alert('Debes introducir un email.')
        return false
    }

    if (passwd == '' || passwd == null)
    {
        alert('Debes introducir una contraseña.')
        return false
    }

    if (confirm == '' || confirm == null)
    {
        alert('Debes confirmar la contraseña.')
        return false
    }

    if (passwd !== confirm)
    {
        alert('Las contraseñas no coinciden.')
        return false
    }

    $.post( form.attr('action'), { nickname: nickname, email: email, passwd: passwd }, function( data )
    {
        var modal = $( data )

        form.trigger("reset")
        modal.on( 'click', function() { modal.hide() } )

        if ($( 'body > div' ).length)
        {
            $( 'body > div#myModal' ).replaceWith(modal)
        }

        else
        {
            modal.appendTo( 'body' )
        }

        $( 'body > header > menu > a' ).focus()
    })

    return false
}
