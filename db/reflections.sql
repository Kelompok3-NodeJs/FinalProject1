PGDMP         -            	    {            reflections    11.21    11.21                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false                       1262    16504    reflections    DATABASE     �   CREATE DATABASE reflections WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE reflections;
             postgres    false            �            1255    16538    update_timestamp()    FUNCTION     �   CREATE FUNCTION public.update_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
END;
$$;
 )   DROP FUNCTION public.update_timestamp();
       public       postgres    false            �            1259    16519    reflections    TABLE       CREATE TABLE public.reflections (
    id integer NOT NULL,
    success text,
    low_point text,
    take_away text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer
);
    DROP TABLE public.reflections;
       public         postgres    false            �            1259    16517    reflections_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reflections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.reflections_id_seq;
       public       postgres    false    199                       0    0    reflections_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.reflections_id_seq OWNED BY public.reflections.id;
            public       postgres    false    198            �            1259    16507    users    TABLE     t   CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying,
    password character varying
);
    DROP TABLE public.users;
       public         postgres    false            �            1259    16505    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public       postgres    false    197                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
            public       postgres    false    196            �
           2604    16522    reflections id    DEFAULT     p   ALTER TABLE ONLY public.reflections ALTER COLUMN id SET DEFAULT nextval('public.reflections_id_seq'::regclass);
 =   ALTER TABLE public.reflections ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    199    198    199            �
           2604    16516    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    197    196    197                      0    16519    reflections 
   TABLE DATA               i   COPY public.reflections (id, success, low_point, take_away, created_at, updated_at, user_id) FROM stdin;
    public       postgres    false    199   �       
          0    16507    users 
   TABLE DATA               4   COPY public.users (id, email, password) FROM stdin;
    public       postgres    false    197   S                  0    0    reflections_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.reflections_id_seq', 11, true);
            public       postgres    false    198                       0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 20, true);
            public       postgres    false    196            �
           2606    16527    reflections reflections_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.reflections
    ADD CONSTRAINT reflections_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.reflections DROP CONSTRAINT reflections_pkey;
       public         postgres    false    199            �
           2606    16515    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public         postgres    false    197            �
           2620    16539 "   reflections update_table_timestamp    TRIGGER     �   CREATE TRIGGER update_table_timestamp BEFORE UPDATE ON public.reflections FOR EACH ROW EXECUTE PROCEDURE public.update_timestamp();
 ;   DROP TRIGGER update_table_timestamp ON public.reflections;
       public       postgres    false    199    200            �
           2606    16540    reflections users_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.reflections
    ADD CONSTRAINT users_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 >   ALTER TABLE ONLY public.reflections DROP CONSTRAINT users_fk;
       public       postgres    false    197    2699    199               �   x���M
�@F���@C��3�Cx�n���7ՍRL�a���o��.����F�A�K����K��3XnR�L�"Κ�0����bbtoU-Ca�r��ш�b�#�&�l�^R��c�J-Z8G���UQ�'ۙ�0���v��˯���ptMB�����F�� �Z�.x[�kE�Z�f�f�'�1�z      
   ,  x�}�Ɏ�@���s�1�-l6����r��c�4m�����DI+s*�~�SI�K/D.�[�[�8w/�p�
�W�.uo8���Lm8�E\q�+d�O��2���*J�D��<R��)�?ڡ�B�J�^4���+��▣���v�Ru��g-x�f�DS����'L��,�"���nׄ�p7�i$N�b�3lB�ZE�i��D�yݳW�g�-/bV�&�ɺ���;[U$��7ͩ�3~�iK��m⮴�w~xA�����$���eO!�1뜠���y6�� ��ݔ����v�|�R��1��DۣM�j�8R^ݷ�����x"hb���d�H��#f&؍�Y_��'��䚷^��DU%��/�$�Bְ ��&���~ O�g�� �Y��[�hy�7s|�͜��r
H_��u������l64#]Mc�m9�.����������6�M�_ed���u�Ij1�K`�g�jT�ճ���g�]�꽁��d�u)o�)��F���\h?��#ܙy�:0�<!�������ǈN�Nw�>���(��9     